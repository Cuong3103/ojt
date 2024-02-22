import { LoginForm } from "@/app/components/auth/login-form";
import { FC } from "react";

export type LoginPageProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const LoginPage: FC<LoginPageProps> = (props) => {
  return (
    <LoginForm
      error={props.searchParams?.error}
      callbackUrl={props.searchParams?.callbackUrl}
    />
  );
};

export default LoginPage;
