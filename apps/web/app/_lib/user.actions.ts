import { prisma } from "@/server/index";

interface IAddUser {
  email: string;
  displayName?: string;
  password?: string;
  image?: string;
}

export async function getUserByEmail(email: string) {
  const result = await prisma.user.findUnique({
    where: { email }
  });
  return result ?? null;
};

async function getUserByDisplayName(displayName: string) {
  const result = await prisma.user.findMany({
    where: { displayName }
  });
  return result ?? null;
};

export async function addUser({
  email,
  displayName,
  password,
  image,
}: IAddUser) {
  try {
    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
      if (isUserExist.displayName === displayName) {
        throw new Error("Display name already registered");
      }
      throw new Error("Email already registered");
    }

    const isDisplayNameExist = await getUserByDisplayName(displayName!);

    if (isDisplayNameExist.length > 0) {
      throw new Error("Display name already registered");
    }

    const user = await prisma.user.create({
      data: {
        email,
        displayName: displayName || email.split('@')[0],
        password,
        image
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
