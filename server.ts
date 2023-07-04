require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT;

server.listen().then(() => {
  console.log(`http://localhost:${PORT}/ 에서 서버가 실행중입니다 `);
});
