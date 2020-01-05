const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO: check if user are logged in
    const item = ctx.db.mutation.createItem({ data: { ...args } }, info); //<-- `info` let the method known what to return
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
  }
};

module.exports = Mutations;
