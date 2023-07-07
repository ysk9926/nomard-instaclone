import client from "../../../client";
import { IAccount } from "../user.interface";

export default {
  Query: {
    seeProfile: async (_: unknown, { userName }: IAccount) => {
      return client.user.findFirst({ where: { userName } });
    },
  },
};
