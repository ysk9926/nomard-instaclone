import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type editProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      userName: String
      email: String
      password: String
      avatarURL: Upload
      githubUsername: String
    ): editProfileResult!
  }
`;
