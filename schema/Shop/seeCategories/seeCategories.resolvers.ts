import client from "../../../client";

interface ICursor {
  cursor: number;
}

export default {
  Query: {
    seeCategories: async (_: unknown, { cursor }: ICursor) =>
      await client.category.findMany({
        take: 5,
        skip: cursor ? cursor : 0,
        ...(cursor && { cursor: { id: cursor } }),
      }),
  },
};
