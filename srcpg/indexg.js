const { connectToDB } = require("./config/database");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { Query } = require("mongoose");
const { signupUser } = require("./controllers/userController");

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
input Loginuser {
  useremail: String
  userpassword: String
}
 type Query {
  signup(user: SignupUser): String
  login(loginUser: Loginuser)
 }

`;

const resolvers = {
  Query: {
    signup: async (_, arg) => {
      console.log(arg);
      const response = await signupUser(arg.user);
      return response;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// const { url } = await startStandaloneServer(server, {
//   context: async ({ req, res }) => ({}),
// });

connectToDB()
  .then(async (res) => {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req, res }) => ({}),
    });
    console.log(`🚀 Server listening at: ${url}`);
  })
  .catch((res) => {
    console.log("Res: ", res);
  });
