import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "../../actions/auth";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { actions } from "../../../store/auth/auth";

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

type RegisterUser = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({ resolver: zodResolver(registerSchema) });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisterUser) => {
    const user = { username: data.username, password: data.password };
    await dispatch(actions.register(user));
    reset();
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("username")} />
        {errors.username && <div>{errors.username.message}</div>}
        <input type="text" {...register("password")} />
        {errors.password && <div>{errors.password.message}</div>}
        <input type="text" {...register("confirmPassword")} />
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        <button type="submit">Submit</button>
      </form>
      <span>
        Don't have an account?
        <a href="/login">Login</a>
      </span>
    </main>
  );
}
