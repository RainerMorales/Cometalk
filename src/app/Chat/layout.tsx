"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      console.log(user)
      if (!user || !user.emailVerified) {
        router.push("/Login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubcribe();
  }, [router]);
  if (loading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
            Please Wait🙂..
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      </>
    );
  }
  return <>{children}</>;
}
