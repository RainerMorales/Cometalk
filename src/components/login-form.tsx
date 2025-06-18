"use client";
import { cn } from "@/lib/utils";
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
import { useState } from "react";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className=" text-black ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your Username below</CardDescription>
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
                  required
                />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="email">Password</Label>
                <Input
                  className="border-zinc-800"
                  id="password"
                  type="password"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="email">Username</Label>
                <Input
                  className="border-zinc-800"
                  id="Name"
                  type="Name"
                  placeholder="Juan"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm ">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
