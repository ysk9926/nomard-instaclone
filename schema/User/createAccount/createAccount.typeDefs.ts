import { gql } from "apollo-server-express";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      userName: String!
      email: String!
      password: String!
      githubUsername: String!
    ): CreateAccountResult!
  }
`;
