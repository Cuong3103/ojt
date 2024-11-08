"use server";
import { jwtDecode } from "jwt-decode";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getUserTokenInfo = (session: Session) => {
  return session.user;
};

export const getDecodedToken = (accessToken?: string) => {
  if (!accessToken) {
    return null;
  } else {
    try {
      return jwtDecode(accessToken);
    } catch (error) {
      throw new Error();
    }
  }
};

export const getExpiryFromToken = (accessToken?: string) => {
  return getDecodedToken(accessToken)?.exp;
};
