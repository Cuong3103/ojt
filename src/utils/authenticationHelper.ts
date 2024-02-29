"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getUserTokenInfo = (session: Session) => {
  return session.user;
};
