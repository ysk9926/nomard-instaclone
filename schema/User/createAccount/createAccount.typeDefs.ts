import { gql } from "apollo-server-express";

export default gql`
  type craeteAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    craeteAccount(
      userName: String!
      email: String!
      password: String!
      githubUsername: String!
    ): craeteAccountResult!
  }
`;
