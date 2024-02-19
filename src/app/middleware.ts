import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export { default } from "next-auth/middleware";

export const middleware = async () => {
  const session = await getServerSession();

  if (session && session?.user) {
    return redirect("/dashbaord");
  } else {
    return redirect("/login");
  }
};
