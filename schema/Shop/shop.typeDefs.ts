import { gql } from "apollo-server-express";

export default gql`
  type Shop {
    id: Int!
    name: String!
    adress: String!
    user: User!
    photos: String
    categories: [Category]
    createdAt: String!
    updatedAt: String!
  }

  type ShopPhoto {
    id: Int!
    url: String!
    shopId: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: Int!
    slug: String!
    shops: [Shop]
    createdAt: String!
    updatedAt: String!
  }
`;
