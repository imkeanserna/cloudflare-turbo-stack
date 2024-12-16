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
import { SignUpSchema, SignUpType } from "@repo/ui/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FC, useState } from "react";
import FormError from "./formError";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface SignUpFormProps {
  onSubmitAction: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: string }>;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmitAction }) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const onGithubSubmit = () => {
    setErrorMessage("");
    signIn("github", { callbackUrl: "/profile" });
  };

  const onGoogleSubmit = () => {
    setErrorMessage("");
    signIn("google", { callbackUrl: "/profile" });
  };

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  return (
    <Card className="w-[95vw] max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              setErrorMessage("");
              onSubmitAction(data.email, data.password, data.name)
                .then((message) => {
                  if (message) {
                    setErrorMessage(message.error);
                  }
                })
                .catch((_err) => {
                  setErrorMessage("Something went wrong");
                });
            })}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                Sign Up
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
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
