"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const SessionProviders: FC<ReactNode> = (children) => {
  return <SessionProvider>{children}</SessionProvider>;
};
