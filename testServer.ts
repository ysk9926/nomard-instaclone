require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { dynamicImport } from "tsimportlib";
import { getUser } from "./schema/User/user.util";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token as string),
      };
    },
  });
  const PORT = process.env.PORT;

  const app = express();

  const graphqlUploadExpressModule = await dynamicImport(
    "graphql-upload/graphqlUploadExpress.mjs",
    module
  );
  app.use(graphqlUploadExpressModule.default());
  app.use("/static/", express.static("uploads"));

  server.start().then(() => {
    server.applyMiddleware({ app });
  });

  app.listen({ port: PORT }, () =>
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath} `
    )
  );
}

startApolloServer();
