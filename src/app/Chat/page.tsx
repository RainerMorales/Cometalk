"use client";
import { auth } from "../../../firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const Logout = async () => {
    try {
      await signOut(auth);
      router.push("./Login");
    } catch (err) {
      alert("something went wrong!");
    }
  };
  return (
    <>
      <div className=" flex items-center justify-between text-center p-4 bg-zinc-800   border-b">
        <div className="text-white font-bold ">Cometalk</div>
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
        <div className=" m-4 rounded">
          <div className="text-xs flex justify-center opacity-60">
            <div>May10 | 9:55 PM</div>
          </div>
          <div className="flex justify-end h-fit space-y-4">
            <div className="border-2 p-4 m-2 rounded-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              repellendus aperiam maxime, molestiae totam, sunt quod
              reprehenderit accusamus veritatis fugit iusto iste quas dolorum
              eum qui quo reiciendis deleniti cumque.
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 w-full h-20 flex items-center justify-center border-t rounded-2xl">
        <div className="flex w-full max-w-sm items-center space-x-2 m-4">
          <Input
            className="rounded-full h-10 text-black"
            type="text"
            placeholder="Message"
          />
          <Button className="bg-black text-white" type="submit">
            <IoSend />
          </Button>
        </div>
      </div>
    </>
  );
}
