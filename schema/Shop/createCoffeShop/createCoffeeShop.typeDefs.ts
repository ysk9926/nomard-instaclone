import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type Mutation {
    createCoffeeShop(
      name: String!
      adress: String!
      categories: String
      photos: Upload
    ): mutationResponse!
  }
`;
