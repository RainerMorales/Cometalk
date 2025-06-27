"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { auth, db } from "../../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
export default function Home() {
  const user = auth.currentUser;
  const [message, setMessage] = useState("");

  const [dialog, setDialog] = useState(true);
  const [users, setUsers] = useState<{ name: string; userName: string }[]>([]);
  // const [curuser,setCurruser]=useState(null)
  const [displayMessage, setDisplayMessage] =
    useState<{ text: string; DisplayName: string; createdAt: Timestamp }[]>();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(
        (doc) => doc.data() as { name: string; userName: string }
      );
      // const unsub = auth.onAuthStateChanged((user)=>{
      //   setCurruser(user)
      // })

      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const messageQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );
    const messages = onSnapshot(messageQuery, (snapshot) => {
      const userMessages = snapshot.docs.map(
        (doc) =>
          doc.data() as {
            text: string;
            DisplayName: string;
            createdAt: Timestamp;
          }
      );
      setDisplayMessage(userMessages.reverse());
    });
    return () => messages();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error("Type Something!", {
        position: "top-right",
      });
      return;
    }
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: user?.uid,
        DisplayName: user?.displayName,
      });
      setMessage("");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <AlertDialog open={dialog} onOpenChange={setDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Welcome{" "}
              <span className="text-blue-800">{user?.displayName}!</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please be respectful and kind when chatting with others!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>I Understand!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className=" flex items-center justify-between text-center p-4 bg-black  border-b">
        <div className="text-white font-bold ">Cometalk</div>
        <Drawer></Drawer>
      </div>
      <main className="h- max-w-2xl m-auto ">
        <div className="border-b shadow rounded-full overflow-auto scrollbar-hidden p-4 gap-2 flex">
          <div className="indicator p-2 text-center text-xs min-w-18  flex items-center justify-center bg-green-900 rounded-full ">
            <div className="flex items-center justify-center bg-base-300 gap-2   text-white place-items-center">
              User
              <FaArrowRight />
            </div>
          </div>

          {users.map((user, i) => (
            <div
              key={i}
              className="indicator p-2 text-center text-xs min-w-18  flex items-center justify-center bg-black rounded-full "
            >
              <span className="indicator-item status bg-green-400 rounded-full"></span>

              <div className="bg-base-300 grid text-white place-items-center">
                {user.userName}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-60 m-2 rounded">
          {/* <div className="indicator">
            <span className="indicator-item status bg-amber-400 rounded-full"></span>
            <div className="bg-base-300 grid h-32 w-32 place-items-center">
              content
            </div>
          </div> */}
          {displayMessage?.map((user, i) => (
            <BlurFade
              delay={0.25 + i * 0.25}
              direction="left"
              inView
              key={i}
              className="flex justify-end mt-2 px-2 sm:px-4"
            >
              <div className="max-w-[80%] sm:max-w-[60%] relative">
                <div className="text-xs text-right opacity-60 mb-1">
                  {user.DisplayName}
                </div>
                <div className="borde p-3 sm:p-4 rounded-lg bg-zinc-800 text-white relative">
                  <div>{user.text}</div>
                  <div className="text-[10px] sm:text-xs opacity-50 text-right mt-1">
                    {user.createdAt?.toDate ? (
                      user.createdAt.toDate().toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    ) : (
                      <span className="loading loading-spinner loading-xs"></span>
                    )}
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </main>
      <div className="fixed bottom-0 w-full h-20 flex items-center justify-center border-t rounded-2xl bg-white">
        <div className="flex w-full max-w-sm items-center space-x-2 m-4">
          <Input
            className="rounded-full h-10 text-black"
            value={message}
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
