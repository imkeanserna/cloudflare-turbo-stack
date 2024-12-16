"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "@repo/ui/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FC, useEffect, useState } from "react";
import FormError from "./formError";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const LoginForm: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const searchParams = useSearchParams();

  const onGithubSubmit = () => {
    setErrorMessage("");
    signIn("github", { callbackUrl: "/profile" });
  };

  const onGoogleSubmit = () => {
    setErrorMessage("");
    signIn("google", { callbackUrl: "/profile" });
  };

  const onSubmit = (data: LoginType) => {
    setErrorMessage("");
    signIn("credentials", { ...data, callbackUrl: "/profile" });
  };

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const error = searchParams.get("error");

    if (error == "CredentialsSignin") {
      setErrorMessage("Invalid credentials");
    } else if (error != null) {
      setErrorMessage("Something went wrong");
    }
  }, []);

  return (
    <Card className="w-[95vw] max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError errorMessage={errorMessage} />
              </div>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full"
              >
                Login
              </Button>
              <div className="flex justify-center items-center text-muted-foreground">
                or
              </div>
            </div>
          </form>
        </Form>
        <div className="mt-3 flex gap-2">
          <Button
            disabled={form.formState.isSubmitting}
            variant="outline"
            className="w-full"
            onClick={onGoogleSubmit}
          >
            <FcGoogle className="w-5 h-5" />
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            variant="outline"
            className="w-full"
            onClick={onGithubSubmit}
          >
            <FaGithub className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
