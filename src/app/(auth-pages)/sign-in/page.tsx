
import { AuthBackground } from "@/components/auth/auth-background";
import { FormMessage, Message } from "@/components/form-message";
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { NavbarWrapper } from "@/components/navbar-wrapper";



export default async function AuthPage(props: {
  searchParams: Promise<Message>;
}) { 
  const searchParams = await props.searchParams;

  return (
    <div className="w-full h-full">
      <div className="w-full h-full absolute">
          <AuthBackground />
      </div>
      <div className="">
          <NavbarWrapper />
      </div>
      <div className="absolute w-full h-full">
        <div className="flex justify-center items-center h-full">
        <div className="md:w-full max-w-[500px] flex-col flex gap-3">
                <AuthTabs path={"login"} />
                <form className="flex flex-col md:w-full max-w-[500px] animate-fade-left bg-black bg-opacity-40 px-5 py-5 rounded-lg">
                    {("error" in searchParams || "success" in searchParams) && (
                        <div className="pb-3">
                        <FormMessage message={searchParams} />
                        </div>
                    )}
                    <h1 className="text-2xl font-medium">Sign in</h1>
                    <p className="text-sm text-foreground">
                        Don&apos;t have an account?{" "}
                        <Link className="text-primary font-medium underline" href="/sign-up">
                            Sign up
                        </Link>
                    </p>
                    <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" placeholder="you@example.com" required />
                        <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            className="text-xs text-foreground underline"
                            href="/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                    />
                    <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                    Sign in
                    </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
