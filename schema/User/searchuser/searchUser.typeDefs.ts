import { gql } from "apollo-server-express";

export default gql`
  type searchUserResult {
    error: String
    user: [User]
  }
  type Query {
    searchUser(keyword: String!, cursor: Int): searchUserResult!
  }
`;
