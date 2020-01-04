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
  }
};

module.exports = Mutations;
