const { connectToDB } = require("./config/database");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { Query } = require("mongoose");
const {
  signupUser,
  loginUser,
  getProfile,
} = require("./controllers/userController");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@apollo/server/express4");
const { userAuth } = require("./config/database");
const http = require("http");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());

const typeDefs = `#graphql
input SignupUser {
  firstname: String
  lastname: String
  useremail: String
  userpassword: String
  age: Int
  gender: String
  city: String
  about: String
  skills: String
}

type SignupUserType {
  firstname: String
  lastname: String
  useremail: String
  userpassword: String
  age: Int
  gender: String
  city: String
  about: String
  skills: String
}
input Loginuser {
  useremail: String
  userpassword: String
}
 type Query {
  signup(user: SignupUser): String
  login(loginUser: Loginuser): String
  profile: [SignupUserType]
 }

`;

const resolvers = {
  Query: {
    signup: async (_, arg) => {
      const response = await signupUser(arg.user);
      return response;
    },
    login: async (_, arg, contextValue) => {
      const response = await loginUser(arg.loginUser, contextValue.res);
      return response;
    },
    profile: async (_, __, contextValue) => {
      try {
        const user = await userAuth(contextValue.req);
        console.log("User: ", user);
        return user;
      } catch (err) {
        throw new Error("Unauthorized request");
      }
    },
  },
};
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// const { url } = await startStandaloneServer(server, {
//   context: async ({ req, res }) => ({}),
// });

async function startServer() {
  await server.start();
  connectToDB().then(async (res) => {
    // const { url } = await startStandaloneServer(server, {
    //   context: async ({ req, res }) => {
    //     console.log("Value: ", res.cookies);
    //     return {
    //       res: res,
    //       req: req,
    //     };
    //   },
    // });
    app.use(
      "/",
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          return {
            res: res,
            req: req,
          };
        },
      })
    );
    httpServer.listen(4000, () => {
      console.log("Server is running on http://localhost:4000/graphql");
    });
    //console.log(`🚀 Server listening at: ${url}`);
  });
}

startServer();
