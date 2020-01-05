const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  // If the query exactly the same as the prisma's query we can just use `forwardTo`, no need to re-write the query like this
  /*async items(parent, args, ctx, info) {
    const items = await ctx.db.query.items();
    return items;
  }*/

  users: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is a current userid
    if (!ctx.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.userId }
      },
      info
    );
  }
};

module.exports = Query;
