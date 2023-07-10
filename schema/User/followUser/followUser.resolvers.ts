import client from "../../../client";
import { IUser } from "../user.interface";
import { protectResolver } from "../user.util";

export default {
  Mutation: {
    followUser: protectResolver(
      async (_: unknown, { userName }: IUser, { loggedInUser }) => {
        if (!loggedInUser) {
          return {
            ok: false,
            error: "로그인후 이용할수 있습니다",
          };
        }
        const checkUser = client.user.findUnique({
          where: {
            userName,
          },
          select: {
            userName: true,
          },
        });
        if (!checkUser) {
          return {
            ok: false,
            error: "유저가 존재하지 않습니다",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
