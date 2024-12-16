import GitHub from "next-auth/providers/github";
import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.email && session.user) {
        if (token.name) {
          session.user.name = token.name;
        }
        if (token.id) {
          session.user.id = token.id as string;
        }
        if (token.image) {
          session.user.image = token.image as string;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;
