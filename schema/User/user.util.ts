import jwt from "jsonwebtoken";
import { IContext, IError, IJwt } from "./user.interface";
import client from "../../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = (await jwt.verify(
      token,
      String(process.env.SERET_KEY)
    )) as IJwt;
    const user = client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

type ResolverFunction<T, R> = (
  root: unknown,
  args: T,
  context: IContext,
  info: unknown
) => Promise<R>;

export const protectResolver =
  // ourResolver는 ResolverFunction의 타입을 따르는 함수라는걸 선언


    <T, R>(ourResolver: ResolverFunction<T, R>) =>
    (
      root: unknown,
      args: T,
      context: IContext,
      info: unknown
    ): Promise<R | IError> => {
      if (!context.loggedInUser) {
        // promise.resolve()를 사용하여서 이미 선언된 promise객체를 불러와서 사용할수 있다
        return Promise.resolve({
          ok: false,
          error: "로그인후 사용할수 있습니다",
        });
      } else {
        return ourResolver(root, args, context, info);
      }
    };
