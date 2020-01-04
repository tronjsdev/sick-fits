const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db")
  // If the query exactly the same as the prisma's query we can just use `forwardTo`, no need to re-write the query like this
  /*async items(parent, args, ctx, info) {
    const items = await ctx.db.query.items();
    return items;
  }*/
};

module.exports = Query;
