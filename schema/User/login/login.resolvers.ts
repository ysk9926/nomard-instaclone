import client from "../../../client";
import { IAccount } from "../user.interface";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_: unknown, { userName, password }: IAccount) => {
      const user = await client.user.findFirst({
        where: {
          userName,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "아이디나 비밀번호가 잘못되었습니다",
        };
      }
      const passwordOk = await bycrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "아이디나 비밀번호가 잘못되었습니다",
        };
      }
      const token = await jwt.sign(
        { id: user.id },
        String(process.env.SERET_KEY)
      );
      return {
        ok: true,
        token,
      };
    },
  },
};
