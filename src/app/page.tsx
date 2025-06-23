"use client";

import { Button } from "@/components/ui/button"; // update path if needed
import Link from "next/link";
import Image from "next/image";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-start p-32 items-center">
      <main className="flex flex-col items-center justify-center gap-6 px-6 text-left">
        <div>
          <div className="text-6xl font-bold ">Welcome</div>
          <div className="flex items-center gap-2 p-2">
            <div className="text-3xl opacity-80">
              to <AnimatedGradientText className="font-bold">Cometalk</AnimatedGradientText>
            </div>
            <Image alt="image" height={50} width={25} src={"/chat.png"}></Image>
          </div>
        </div>

        <div>
          <div className="opacity-80 text-sm">
            Talk to Anyone. Anytime. Anywhere.
          </div>
        </div>

        <Link href="/Login">
          <Button className="w-80 py-6 hover:bg-gray-900 shadow-2xl border">
            Get Started!
          </Button>
        </Link>
      </main>
      <footer className="fixed bottom-0 w-full text-center p-4 text-xs opacity-80">
        Developed by Rainer Morales 👋💖
      </footer>
    </div>
  );
}
