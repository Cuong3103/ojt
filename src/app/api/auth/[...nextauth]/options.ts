import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { MockResponse } from "@/app/services/mock-response.service";
import axiosInstance from "@/lib/axios";
import { isFlagEnabled } from "@/lib/feature-flags/config-cat";
import { UsersFlag } from "@/lib/feature-flags/feature-flags.constant";
import { getExpiryFromToken } from "@/utils/authenticationHelper";
import {
  API_LIST,
  SUCCESS_HTTP_CODES,
  getRoute,
  minutesToMiliseconds,
} from "@/utils/constants";

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

  try {
    const res = await axiosInstance.post(getRoute(API_LIST.REFRESH_TOKEN), {
      token: token.refreshToken,
    });

    response = await res.data.data;

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

const handleSignin = async (email: string, password: string) => {
  return await axiosInstance.post(
    getRoute(API_LIST.LOGIN),
    JSON.stringify({
      email: email,
      password: password,
    })
  );
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },

      async authorize(credentials) {
        let response = null;
        if (!credentials?.email || !credentials?.password) return null;

        const isEnabled = await isFlagEnabled(UsersFlag.LOGIN);
        if (!isEnabled) {
          response = loginMock;
        } else {
          const res = await handleSignin(
            credentials.email,
            credentials.password
          );
          if (res?.data && SUCCESS_HTTP_CODES.includes(res.status)) {
            response = res?.data.content;
          } else {
            response = undefined;
          }
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
        token.user = user.userDTO;
        token.accessToken = user.token;

        token.accessTokenExpiry = getExpiryFromToken(token.accessToken) || minutesToMiliseconds(1);
        token.refreshToken = user.refreshToken;
      }

      const refreshTime = Math.round(
        Date.now() - token.accessTokenExpiry
      );

      if (refreshTime > 0) {
        return Promise.resolve(token);
      }

      token = await refreshToken(token);
      return Promise.resolve(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return Promise.resolve(session);
    },
  },
};
