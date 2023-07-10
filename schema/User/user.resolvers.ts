import client from "../../client";
import { IContext, IUser } from "./user.interface";

export default {
  User: {
    isMe: ({ id }: IUser, _: unknown, { loggedInUser }: IContext) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser?.id;
    },
  },
};
