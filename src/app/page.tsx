import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <div className=" flex items-center justify-center text-center p-4 text-white bg-zinc-800  font-bold text-2xl  border-b">
        Cometalk
      </div>
      <main className="h-screen max-w-2xl m-auto   text-white">
        <div className="h-[70%] m-4 rounded">
          <div className="min-h-30 border bg-zinc-800  p-4 m-2 rounded-xl space-y-4">
            <div className=" text-sm flex justify-between opacity-60">
              <div>Rainer</div>
              <div>May10</div>
            </div>
            <div>
              <div>Hi Rainer morales!</div>
            </div>
          </div>
        </div>
        <div className="h-20 flex items-center justify-center border-t rounded-2xl">
          <div className="flex w-full max-w-sm items-center space-x-2 m-4">
            <Input
              className="rounded-full h-10 text-black"
              type="text"
              placeholder="Message here"
            />
            <Button className="bg-black text-white" type="submit">
              Send
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
