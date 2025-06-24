"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = async () => {
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Chat");
    } catch (err) {
      console.error(err)
      setPassword("");
      setLoading(false);
      toast.error("Invalid Credentials!", {
        position: "top-right",
        duration:5000
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className=" text-black ">
        <CardHeader>
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>Enter your email and password</CardDescription>
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
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  Show Password
                </label>
              </div>
              {!loading ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault(); login();
                  }}
                  type="submit"
                  className="w-full "
                >
                  Log in
                </Button>
              ) : (
                <Button className="w-full cursor-not-allowed">
                  <span className="loading loading-spinner loading-xs "></span>
                </Button>
              )}
            </div>

            <div className="mt-4 text-center text-sm ">
              Don&apos;t have an account?{" "}
              <Link href={"/Signup"} className="underline underline-offset-4">
                Signup
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
