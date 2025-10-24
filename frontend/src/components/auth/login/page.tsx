import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./form";

export default function Login() {
  return (
    <main className="grow flex flex-col pt-[200px] items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
