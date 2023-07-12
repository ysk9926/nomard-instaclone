import client from "../../../client";
import { protectResolver } from "../../User/user.util";
import { awsPhotoUpload, processSlug } from "../../shared/shared.utils";

export interface ICreateCoffeeShop {
  name: string;
  adress: string;
  categories: string;
  photos: any;
}

export default {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _: unknown,
        { name, adress, categories, photos }: ICreateCoffeeShop,
        { loggedInUser }
      ) => {
        let PhotoURL = null;
        if (photos) {
          PhotoURL = await awsPhotoUpload(
            photos,
            loggedInUser.id,
            "CoffeeShop"
          );
        }
        let slugObj: any = [];
        if (categories) {
          slugObj = processSlug(categories);
        }
        const existingName = await client.shop.findFirst({
          where: {
            name,
          },
        });
        if (existingName) {
          return {
            ok: false,
            error: "중복된 가게 이름이 존재합니다",
          };
        }

        await client.shop.create({
          data: {
            name,
            adress,
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
            categories: {
              connectOrCreate: slugObj,
            },
            photos: {
              create: PhotoURL ? { url: PhotoURL } : undefined,
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
