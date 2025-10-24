import { RegisterForm } from "./form";
import { AuthLayout } from "../auth-layout";
import { Link } from "react-router";
import { AppPath } from "@/common/common";

export default function Register() {
  return (
    <AuthLayout
      title="Register"
      form={<RegisterForm />}
      footerText={
        <>
          Have an account? <Link to={AppPath.LOGIN}>Login</Link>
        </>
      }
    />
  );
}
