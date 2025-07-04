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
    <div className="relative   min-h-screen flex flex-col justify-start p-32 items-center">
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
            <Button className="w-80 py-6 hover:bg-black  border  rounded-full hover:scale-105">
              Get Started!
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-white hover:bg-white text-black w-80 py-6 border  rounded-full hover:scale-105">
                About
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-h-[80vh] overflow-y-auto bg-white text-black border border-neutral-200">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-neutral-900">
                  About This Chat System
                </AlertDialogTitle>

                <AlertDialogDescription asChild>
                  <div className="text-left space-y-5 text-sm leading-relaxed text-neutral-700">
                    <p>
                      Welcome to our chat platform — a real-time messaging
                      experience built with simplicity, privacy, and community
                      in mind.
                    </p>

                    <div>
                      <p className="font-semibold text-base text-neutral-900">
                        How to Use:
                      </p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>
                          Create an account using your email and password.
                        </li>
                        <li>
                          <strong className="text-black">
                            Verify your email
                          </strong>{" "}
                          — a verification link will be sent.
                        </li>
                        <li>Once verified, log in to access the chat room.</li>
                        <li>Chat with others in real time.</li>
                      </ol>
                    </div>

                    <div className="text-sm border-t pt-4 border-neutral-200 text-neutral-600">
                      💡 <strong className="text-black">Reminder:</strong>{" "}
                      Please use respectful language at all times. Spamming,
                      hate speech, or inappropriate behavior will lead to
                      suspension or banning.
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-neutral-900 text-white hover:bg-neutral-800 transition">
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
