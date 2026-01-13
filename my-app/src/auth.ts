// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        login: { label: "Логин", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { login: credentials.login as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          login: user.login,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.login = user.login;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      if (token?.login) session.user.login = token.login as string;
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,

  // ★★★ Вот это главное исправление для localhost ★★★
  trustHost: true, // часто помогает в dev

  cookies: {
    sessionToken: {
      name: isProduction 
        ? "__Secure-authjs.session-token" 
        : "authjs.session-token", // без __Secure- в dev

      options: {
        httpOnly: true,
        sameSite: "lax", // или "none" если тестируешь cross-origin, но для localhost "lax" обычно достаточно
        path: "/",
        secure: isProduction, // false в dev → кука будет сохраняться на http://localhost
        maxAge: 30 * 24 * 60 * 60,
      },
    },

    // Опционально — тоже для csrf-токена
    csrfToken: {
      name: isProduction 
        ? "__Host-authjs.csrf-token" 
        : "authjs.csrf-token",
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
      },
    },
  },
});