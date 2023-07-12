import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCategory(slug: String!, cursor: Int): [Shop]
  }
`;
