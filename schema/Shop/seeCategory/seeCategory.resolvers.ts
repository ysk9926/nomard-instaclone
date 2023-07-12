import client from "../../../client";

interface ISeeCategory {
  slug: string;
  cursor: number;
}

export default {
  Query: {
    seeCategory: async (_: unknown, { slug, cursor }: ISeeCategory) =>
      await client.category
        .findUnique({
          where: {
            slug,
          },
        })
        .shops({
          take: 5,
          skip: cursor ? cursor : 0,
          ...(cursor && { cursor: { id: cursor } }),
        }),
  },
};
