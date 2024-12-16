import { Button } from "@repo/ui/components/ui/button";
import { LogIn } from 'lucide-react'
import Link from "next/link";

export default function SignInButton() {
  return (
    <div className="absolute top-4 right-4">
      <Link href="/auth/login">
        <Button
          variant="outline" className="flex items-center gap-2 rounded-lg">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </Link>
    </div>
  )
}
