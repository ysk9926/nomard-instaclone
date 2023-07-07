import client from "../../../client";
import { IAccount, IContext } from "../user.interface";
import { protectResolver } from "../user.util";
import { createWriteStream } from "fs";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _: unknown,
        {
          userName,
          email,
          password: newPassword,
          avatarURL,
          githubUsername,
        }: IAccount,
        { loggedInUser }: IContext
      ) => {
        let avatarUrl = null;
        if (avatarURL) {
          const {
            file: { filename, createReadStream },
          }: any = await avatarURL;
          const newFileName = `${
            loggedInUser?.userName
          }-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFileName
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFileName}`;
        }
        console.log(avatarUrl);
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            userName,
            email,
            githubUsername,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatarURL: avatarUrl }),
          },
        });
        if (updateUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "업데이트가 불가능합니다",
          };
        }
      }
    ),
  },
};
