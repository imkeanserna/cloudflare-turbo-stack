import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      Something went wrong
      <div>
        <Button asChild>
          <Link href="/auth/login">Log in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
