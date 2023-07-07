import client from "../../../client";
import { IAccount } from "../user.interface";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    craeteAccount: async (
      _: unknown,
      { userName, email, password, githubUsername }: IAccount
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 가입된 아이디입니다",
          };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            userName,
            email,
            password: uglyPassword,
            githubUsername,
          },
        });
      } catch {
        return {
          ok: true,
        };
      }
    },
  },
};
