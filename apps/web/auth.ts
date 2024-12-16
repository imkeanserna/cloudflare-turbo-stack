import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@repo/ui/schema";
import Google from "next-auth/providers/google";
import { addUser, getUserByEmail } from "./app/_lib/user.actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHub,
    Credentials({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          try {
            const existingUser = await getUserByEmail(email);

            if (!existingUser || !existingUser.password) {
              return null;
            }

            const isPasswordMatching = bcrypt.compareSync(
              password,
              existingUser.password
            );

            if (!isPasswordMatching) {
              return null;
            }

            return existingUser;
          } catch (error) {
            return null;
          }
        }

        return null;
      },
    }),
  ],
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
    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await getUserByEmail(token.email);

      if (!existingUser) return token;

      token.id = existingUser.id;
      token.name = existingUser.name;
      token.image = existingUser.image;

      return token;
    },
    async signIn({ user, account }) {
      const email = user.email;

      if (!email) {
        return false;
      }

      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        if (user.image) {
          await addUser({ email, image: user.image });
        } else {
          await addUser({ email });
        }
      } else {
        if (existingUser.password && account?.provider != "credentials") {
          return false;
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
