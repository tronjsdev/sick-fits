const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.userId) {
      throw new Error("You must be logged in to do that");
    }
    const item = ctx.db.mutation.createItem(
      {
        data: {
          ...args,
          // This is how to create a relationship between th Item and the User
          user: {
            connect: {
              id: ctx.userId
            }
          }
        }
      },
      info
    ); //<-- `info` let the method known what to return
    return item;
  },

  async updateItem(parent, args, ctx, info) {
    // First take a copy of the updates
    const updates = { ...args };
    //removet the ID form the updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // 2. Check if they own that item, or have permission
    //TODO

    // 3. Delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production"
    });
    return user;
  },

  signin: async (parent, { email, password }, ctx, info) => {
    // 1. Check if user is existing
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error("No such user found for email " + email);
    }
    // 2. Check if password is matched
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credential");
    }
    // 3. Generate the jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production"
    });
    // 5. Return the user
    return user;
  },

  signout: async (parent, args, ctx, info) => {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },

  requestReset: async (parent, { email }, ctx, info) => {
    // 1. Check if user is existing
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error("No such user found for email " + email);
    }
    // 2. Set a reset token and expiry on that user
    const promiseified = promisify(randomBytes);
    const resetToken = (await promiseified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });
    console.log(res);
    return { message: "Thank" };
    // 3. Email them that reset token
  },

  resetPassword: async (
    parent,
    { password, confirmPassword, resetToken },
    ctx,
    info
  ) => {
    // 1. Check if the password match
    if (password !== confirmPassword) {
      throw new Error("Your passwords dont match");
    }
    // 2. Check if it's a legit reset token
    // 3. Check if it's expired or not
    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000 //_gte: greater or equal
      }
    });
    if (!user) {
      throw new Error("This token is either invalid or expired");
    }
    // 4. Hash their new password
    const newPassword = await bcrypt.hash(password, 10);
    // 5. Save the new password to the user and remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: { password: newPassword, resetToken: null, resetTokenExpiry: null }
    });
    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 7. Set JWT token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production"
    });
    // 8. Return the new user
    return updatedUser;
    // 9. Done
  }
};

module.exports = Mutations;
