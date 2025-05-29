import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <main className="h-screen max-w-2xl m-auto  border-2 border-zinc-900  text-white">
        <div className=" flex items-center justify-center text-center p-4  font-bold text-2xl">
          Cometalk
        </div>
        <div className="h-[70%] m-4 rounded bg-zinc-950">
          <div className="min-h-30 bg-zinc-900 p-4 m-2 rounded-xl space-y-4">
            <div className=" text-sm flex justify-between opacity-60">
              <div>Rainer</div>
              <div>May10</div>
            </div>
            <div>
              <div>
               Hi Rainer morales!
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 flex items-center justify-center border border-zinc-900">
          <div className="flex w-full max-w-sm items-center space-x-2 m-4">
            <Input type="text" placeholder="Message here" />
            <Button className="bg-white text-black" type="submit">
              Send
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
