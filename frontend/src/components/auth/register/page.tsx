import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "./use-register";

const registerSchema = z
  .object({
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
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password didn't match",
  });

export default function Register() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { isPending, handleRegister } = useRegister(reset);

  const onSubmit = handleSubmit(handleRegister);

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" {...register("username")} />
        {errors.username && <div>{errors.username.message}</div>}
        <input type="text" {...register("password")} />
        {errors.password && <div>{errors.password.message}</div>}
        <input type="text" {...register("confirmPassword")} />
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
      <span>
        Don't have an account?
        <a href="/login">Login</a>
      </span>
    </main>
  );
}
