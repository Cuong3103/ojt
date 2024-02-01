"use client";
import { useSession } from "next-auth/react";
import Login from "./components/login/login-form";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <main className="">
        <p>Welcome, {session.user.username}!</p>
        <Link href={"/api/auth/signout"}>Log Out</Link>
      </main>
    );
  }

  return (
    <main className="">
      <Login />
    </main>
  );
}
