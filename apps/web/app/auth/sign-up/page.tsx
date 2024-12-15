import { signUpUser } from "@/lib";
import { SignUpForm } from "@repo/ui/components/auth/signupForm";

export const runtime = "edge";

const Page = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <SignUpForm onSubmitAction={signUpUser} />
    </div>
  );
};

export default Page;
