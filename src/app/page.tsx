import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <main className="h-screen max-w-2xl m-auto rounded border border-zinc-900 text-white">
        <div className="flex items-center justify-center text-center p-4  font-bold text-2xl">
          Cometalk
        </div>
        <div className="h-[70%] border border-zinc-900 m-4 rounded-2xl">k</div>
        <div className="h-20 m-4 flex items-center justify-center border border-zinc-900 rounded-2xl">
          <div className="flex w-full max-w-sm items-center space-x-2 m-4">
            <Input type="text" placeholder="Message here" />
            <Button type="submit">Send</Button>
          </div>
        </div>
      </main>
    </>
  );
}
