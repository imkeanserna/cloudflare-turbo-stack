"use server";

import bcrypt from "bcryptjs";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { addUser } from "../app/_lib/user.actions";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const signUpUser = async (
  email: string,
  password: string,
  name: string
) => {
  let success = false;
  let err: any;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await addUser({ email, password: hashedPassword, name });
    success = true;
  } catch (error: any) {
    err = error;
  }

  if (success) {
    redirect("/auth/login");
  } else {
    if (err.message && err.message.includes("UNIQUE")) {
      if (err.message.includes("users.email")) {
        return { error: "Email already registered" };
      } else {
        return { error: "Name already registered" };
      }
    } else {
      return { error: "Something went wrong" };
    }
  }
};
