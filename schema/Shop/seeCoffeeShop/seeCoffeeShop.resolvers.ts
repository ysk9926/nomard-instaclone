import { Shop } from "@prisma/client";
import client from "../../../client";

export default {
  Query: {
    seeCoffeeShop: async (_: unknown, { id }: Shop) =>
      await client.shop.findUnique({ where: { id } }),
  },
};
