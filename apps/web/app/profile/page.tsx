import { currentUser } from "@/lib";
import { redirect } from "next/navigation";

export const runtime = "edge";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <p>Welcome to Profile</p>
    </div>
  );
};

export default Page;
