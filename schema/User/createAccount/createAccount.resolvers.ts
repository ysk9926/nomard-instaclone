import client from "../../../client";
import bcrypt from "bcrypt";
import { IAccount } from "../user.interface";

export default {
  Mutation: {
    createAccount: async (
      _: unknown,
      { userName, email, password, githubUsername }: IAccount
    ) => {
      try {
        //중복 아이디 & 이메일 확인
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
          throw new Error("이미 가입된 아이디이거나 이메일 입니다");
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
