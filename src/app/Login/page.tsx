"use client";
import { LoginForm } from "@/components/login-form";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
export default function Page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (!user || !user.emailVerified) {
        router.push("/Login");
      } else {
        router.push("/Chat");
        setLoading(false);
      }
    });
    return () => unsubcribe();
  }, [router]);
  if (loading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    );
  }
}
