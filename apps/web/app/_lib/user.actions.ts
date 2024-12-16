import { prisma } from "@/server/index";

interface IAddUser {
  email: string;
  name?: string;
  password?: string;
  image?: string;
}

export async function getUserByEmail(email: string) {
  const result = await prisma.user.findUnique({
    where: { email }
  });
  return result ?? null;
};

export async function addUser({
  email,
  name,
  password,
  image,
}: IAddUser) {
  try {
    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
      throw new Error("Email already registered");
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0],
        password: password || null,
        image,
      },
    });
    return {
      email: user.email,
      password: user.password,
    };
  } catch (error) {
    console.error("Error in addUser:", error);
    throw error;
  }
};
