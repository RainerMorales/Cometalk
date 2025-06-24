"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast,{ Toaster } from "react-hot-toast";
export function SignUp({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user);
    } else {
      console.log("User is signed out");
    }
  });
  const create = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: userName,
      });
      await sendEmailVerification(user);
      console.log("check email");
      router.push("/login");
      toast.success("Account created successfully!",{
        position:"top-right"
      })
    } catch (err) {
      toast.error("Something went wrong,Please try again!", {
        position: "top-right",
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className=" text-black ">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Enter your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-2 ">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border-zinc-800"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="email">Password</Label>
                <Input
                  className="border-zinc-800"
                  id="password"
                  type="password"
                  placeholder="example1234"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="email">Username</Label>
                <Input
                  className="border-zinc-800"
                  id="username"
                  type="username"
                  placeholder="Ren"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault(), create();
                }}
                type="submit"
                className="w-full"
              >
                Create
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
