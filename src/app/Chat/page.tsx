"use client";
import { auth, db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDisplayName } from "next/dist/shared/lib/utils";
export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();
  const [message, setMessage] = useState("");
  const Logout = async () => {
    try {
      await signOut(auth);
      router.push("./login");
    } catch (err) {
      alert("something went wrong!");
    }
  };
  const sendMessage = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: user?.uid,
        getDisplayName: user?.displayName,
        email: user?.email,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-between text-center p-4 bg-zinc-800   border-b">
        <div className="text-white font-bold ">{user?.displayName}</div>
        <Button onClick={Logout} className="bg-red-800">
          Log out
        </Button>
      </div>
      <main className="h- max-w-2xl m-auto ">
        <div className=" m-4 rounded">
          <div className="text-xs flex justify-center opacity-60">
            <div>May10 | 9:55 PM</div>
          </div>
          <div className="flex justify-end h-fit space-y-4">
            <div className="border-2 p-4 m-2 rounded-2xl">Hello! </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 w-full h-20 flex items-center justify-center border-t rounded-2xl">
        <div className="flex w-full max-w-sm items-center space-x-2 m-4">
          <Input
            className="rounded-full h-10 text-black"
            type="text"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            className="bg-black text-white"
            type="submit"
          >
            <IoSend />
          </Button>
        </div>
      </div>
    </>
  );
}
