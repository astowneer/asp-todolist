import { LoginForm } from "./form";
import { AuthLayout } from "../auth-layout";
import { Link } from "react-router";
import { AppPath } from "@/common/common";

export default function Login() {
  return (
    <AuthLayout
      title="Login"
      form={<LoginForm />}
      footerText={
        <>
          Don't have an account? <Link to={AppPath.REGISTER}>Register</Link>
        </>
      }
    />
  );
}
