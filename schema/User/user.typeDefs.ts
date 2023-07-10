import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    userName: String!
    email: String!
    password: String!
    gitHubUsername: String!
    isMe: Boolean!
    avatarUrl: String
    followers(cursor: Int): [User]
    following(cursor: Int): [User]
  }
`;
