"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // update path if needed
import Link from "next/link";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-start p-32 items-center">
      <main className="flex flex-col items-center justify-center gap-20 px-6 text-left">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center text-6xl font-extrabold">
            <div className="">Come</div>
            <AnimatedGradientText className="font-bold">
              talk
            </AnimatedGradientText>
          </div>
          <p className="text-zinc-400 text-sm">
            Talk to Anyone. Anytime. Anywhere.
          </p>
        </div>

        <div className="flex flex-col gap-2 ">
          <Link href="/Login">
            <Button className="w-80 py-6 hover:bg-gray-900  border">
              Get Started!
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-white hover:bg-gray-100 text-black w-80 py-6 border shadow-2xl">
                About
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>About This Chat System</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="text-left space-y-4 text-sm">
                    <p>
                      Welcome to our chat platform — a simple, real-time
                      messaging system built with love and respect.
                    </p>

                    <p className="font-semibold">How to Use:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Create an account using your email and password.</li>
                      <li>Log in to access the chat room.</li>
                      <li>Send messages and see others chat in real time.</li>
                      <li>
                        Be kind, respectful, and follow the community rules.
                      </li>
                    </ol>

                    <p className="mt-4">
                      💡 <strong>Reminder:</strong> Use kind and respectful
                      language. No spam or offensive content. Violators may be
                      banned.
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-black text-white">
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full text-center p-4 text-xs opacity-70">
        Developed by Rainer Morales &copy; 2025
      </footer>
    </div>
  );
}
