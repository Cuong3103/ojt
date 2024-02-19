import { User } from "./../../node_modules/next-auth/core/types.d";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      role: string;
      avatarUrl: string;
    };

    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      username: string;
      role: string;
      avatarUrl: string;
    };

    accessToken: string;
    accessTokenExpiry: number;
    refreshToken: string;
  }
}
