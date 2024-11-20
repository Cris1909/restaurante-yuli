import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginEmail } from "@/actions/auth-action";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
        try {
          const user: any = await loginEmail(credentials);
          return user;
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.ced_user = user.ced_user;
        token.nom_user = user.nom_user;
        token.email_user = user.email_user;
        token.password_user = user.password_user;
        token.fkcod_car_user = user.fkcod_car_user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.ced_user = token.ced_user;
        session.user.nom_user = token.nom_user;
        session.user.email_user = token.email_user;
        session.user.password_user = token.password_user;
        session.user.fkcod_car_user = token.fkcod_car_user;
      }
      return session;
    },
  },
});
