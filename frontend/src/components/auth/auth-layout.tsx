import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import React from "react";

export function AuthLayout({
  form,
  title,
  footerText,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <main className="grow flex flex-col pt-[200px] items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
