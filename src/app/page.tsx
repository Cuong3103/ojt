"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center">
        Redirecting to dashboard
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (session && session.user) {
    return redirect("/dashboard");
  } else {
    return redirect("/login");
  }
}
