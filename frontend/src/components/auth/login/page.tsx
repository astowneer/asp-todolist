import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "./use-login";

const loginSchema = z.object({
  username: z
    .string({
      error: "Username is required",
    })
    .min(5, "Username should be at least 5 characters"),
  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password should be at least 6 characters"),
});

export default function Login() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { isPending, handleLogin } = useLogin(reset);

  const onSubmit = handleSubmit(handleLogin);

  return (
    <main>
      <h1 className="font-light">Login</h1>
      <form onSubmit={onSubmit}>
        <input type="text" {...register("username")} />
        {errors.username && <div>{errors.username.message}</div>}
        <input type="text" {...register("password")} />
        {errors.password && <div>{errors.password.message}</div>}
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
      <span>
        Don't have an account?
        <a href="/register">Register</a>
      </span>
    </main>
  );
}
