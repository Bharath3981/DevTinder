const {
  signupUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const { userAuth } = require("../config/database");

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

enum Gender {
    male
    female
    others
}

type SignupUserType {
  firstname: String
  lastname: String
  useremail: String
  userpassword: String
  age: Int
  gender: Gender
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
        return await userAuth(contextValue.req);
      } catch (err) {
        throw new Error("Unauthorized request");
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
