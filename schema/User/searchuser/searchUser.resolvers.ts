import client from "../../../client";
import { ISearchUser } from "../user.interface";

export default {
  Query: {
    searchUser: (_: unknown, { keyword, cursor }: ISearchUser) => {
      if (keyword.length < 2) {
        return {
          error: "검색어를 2글자 이상 작성해주세요",
        };
      }
      const user = client.user.findMany({
        where: {
          userName: {
            startsWith: keyword,
          },
        },
        take: 10,
        skip: cursor ? 1 : 0,
        ...(cursor && { cursor: { id: cursor } }),
      });
      return {
        user,
      };
    },
  },
};
