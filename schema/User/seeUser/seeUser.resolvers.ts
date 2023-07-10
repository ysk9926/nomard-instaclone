import client from "../../../client";
import { IUser } from "../user.interface";

export default {
  Query: {
    seeUser: (_: unknown, { userName }: IUser) =>
      client.user.findUnique({ where: { userName } }),
  },
  User: {
    followers: async ({ id }: IUser, { cursor }: IUser) => {
      return client.user
        .findUnique({
          where: {
            id,
          },
        })
        .follower({
          take: 10,
          skip: cursor ? 1 : 0,
          ...(cursor && { cursor: { id: cursor } }),
        });
    },
    following: async ({ id }: IUser, { cursor }: IUser) => {
      return client.user
        .findUnique({
          where: {
            id,
          },
        })
        .following({
          take: 10,
          skip: cursor ? 1 : 0,
          ...(cursor && { cursor: { id: cursor } }),
        });
    },
  },
};
