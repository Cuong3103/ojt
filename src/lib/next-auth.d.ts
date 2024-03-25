import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "./../../node_modules/next-auth/core/types.d";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: string;
      avatarUrl: string;
      uuid: string;
    };

    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      role: string;
      avatarUrl: string;
      uuid: string;
    };

    accessToken: string;
    accessTokenExpiry: number;
    refreshToken: string;
  }
}
