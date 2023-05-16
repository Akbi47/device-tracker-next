import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "../../../services/user";
import { ensureString } from "../../../utils";

/**
 * @see https://medium.com/@tom555my/strapi-next-js-email-password-authentication-a8207f72b446
 */
export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (!credentials) return null;

        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await login({
            email: credentials.email,
            password: credentials.password,
          });
          return { ...user, jwt };
        } catch (err) {
          // login failed
          console.error(err);
          return null;
        }
      },
    }),
  ],

  // Handle login callback from providers
  callbacks: {
    session: async ({ session, token }) => {
      // TODO: secure client token
      // session.id = token.id;
      // session.jwt = token.jwt;

      // setup data response to client
      const { id, username, email, name } = token;
      const user = { id, username, email, name };
      return Promise.resolve({ ...session, user });
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // update token info when signed
        token.id = user.id;
        token.jwt = user.jwt;
        token.username = user.username;
        token.name = ensureString(user.fullName || user.username);
      }
      return Promise.resolve(token);
    },
  },
};

export default NextAuth(authOptions);
