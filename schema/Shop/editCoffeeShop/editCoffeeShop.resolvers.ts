import client from "../../../client";
import { protectResolver } from "../../User/user.util";
import {
  awsPhotoDelete,
  awsPhotoUpload,
  processSlug,
} from "../../shared/shared.utils";
import { ICreateCoffeeShop } from "../createCoffeShop/createCoffeeShop.resolvers";

export default {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _: unknown,
        { name, adress, categories, photos }: ICreateCoffeeShop,
        { loggedInUser }
      ) => {
        const oldShop = await client.shop.findFirst({
          where: {
            name,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                slug: true,
              },
            },
            photos: {
              select: {
                url: true,
              },
            },
          },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "수정 권한이 없습니다",
          };
        }

        let PhotoURL = null;
        if (photos) {
          if (oldShop.photos) {
            awsPhotoDelete(oldShop.photos[0]?.url, "CoffeeShop");
          }
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
        await client.shop.update({
          where: {
            name,
          },
          data: {
            adress,
            categories: {
              disconnect: slugObj ? oldShop.categories : undefined,
              connectOrCreate: slugObj ? slugObj : undefined,
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
