import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

import { API_LIST, getRoute, minutesToMiliseconds } from "@/utils/constants";
import { isFlagEnabled } from "@/lib/feature-flags/config-cat";
import { MockResponse } from "@/app/services/mock-response.service";
import { UsersFlag } from "@/lib/feature-flags/feature-flags.constant";
import axiosInstance from "@/lib/axios";

const loginMock = new MockResponse(200, {
  id: 1,
  username: "user",
  role: "admin",
  avatarUrl: "",
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiYWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImFkbWluIiwiaWQiOiIxIiwiZXhwIjoxNzA2ODQxMDA1LCJpYXQiOjE3MDY4NDA4ODV9.fMMSqlBhSa3eMiFdgN4_0FFVCtbt3qsJv8vd5uuKXms",
  refreshToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InVzZXIiLCJpZCI6IjEiLCJleHAiOjE3MDkyNzY1NjksImlhdCI6MTcwOTI3NjU2OX0.8lNusIaEMXH_Acs1VDf4EffCNTkrGCgvlfkKtP3-2S0",
});

const refreshMock = new MockResponse(200, {
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiYWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImFkbWluIiwiaWQiOiIxIiwiZXhwIjoxNzA2ODQxMDA1LCJpYXQiOjE3MDY4NDA4ODV9.fMMSqlBhSa3eMiFdgN4_0FFVCtbt3qsJv8vd5uuKXms",
  refreshToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InVzZXIiLCJpZCI6IjEiLCJleHAiOjE3MDkyNzY1NjksImlhdCI6MTcwOTI3NjU2OX0.8lNusIaEMXH_Acs1VDf4EffCNTkrGCgvlfkKtP3-2S0",
});

async function refreshToken(token: JWT): Promise<JWT> {
  let response;
  const isEnabled = await isFlagEnabled(UsersFlag.LOGIN);

  try {
    if (isEnabled) {
      response = refreshMock;
    } else {
      const res = await axiosInstance.post(getRoute(API_LIST.REFRESH_TOKEN), {
        refreshToken: token.refreshToken,
      });

      response = await res.data.data;
    }

    return {
      ...token,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },

      async authorize(credentials) {
        let response = null;
        if (!credentials?.username || !credentials?.password) return null;

        const isEnabled = await isFlagEnabled(UsersFlag.LOGIN);
        if (!isEnabled) {
          response = loginMock;
        } else {
          try {
            const res = await axiosInstance.post(
              getRoute(API_LIST.LOGIN),
              JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              })
            );

            if (res.data.accessToken && res.status !== 401) {
              response = res.data;
            }
          } catch (error) {}
        }

        return response;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.user = user.data;
        token.accessToken = user.data.accessToken;
        token.accessTokenExpiry = minutesToMiliseconds(1);
        token.refreshToken = user.data.refreshToken;
      }

      const refreshTime = Math.round(
        token.accessTokenExpiry - minutesToMiliseconds(1) - Date.now()
      );

      if (refreshTime > 0) {
        return Promise.resolve(token);
      }

      token = await refreshToken(token);
      return Promise.resolve(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return Promise.resolve(session);
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
