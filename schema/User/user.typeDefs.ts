import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    userName: String!
    email: String!
    password: String!
    gitHubUsername: String!
    avatarUrl: String
  }
`;
