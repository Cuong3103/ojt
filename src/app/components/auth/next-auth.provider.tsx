"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

type NextAuthProviderProps = {
  children: ReactNode;
};

export const NextAuthProvider: FC<NextAuthProviderProps> = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
