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
import { getAuth } from "firebase/auth";
export default function Home() {
  const user = auth.currentUser;

  console.log(user?.displayName);
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState(true);
  const [users, setUsers] = useState<{ name: string; userName: string }[]>([]);
  const [displayMessage, setDisplayMessage] =
    useState<
      { text: string; DisplayName: string; createdAt: Timestamp; uid: string }[]
    >();

  useEffect(() => {
    //
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(
        (doc) => doc.data() as { name: string; userName: string }
      );
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //MESSAGES
    const messageQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );
    const messages = onSnapshot(messageQuery, (snapshot) => {
      const userMessages = snapshot.docs.map(
        (doc) =>
          doc.data() as {
            uid: string;
            text: string;
            DisplayName: string;
            createdAt: Timestamp;
          }
      );
      setDisplayMessage(userMessages.reverse());
    });
    return () => messages();
  }, []);

  useEffect(() => {
    //CURRENT USER
    const auth = getAuth();
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
      <main className="max-w-2xl m-auto ">
        <div className="sticky top-0 z-20 bg-white/30 backdrop-blur-sm border-b shadow rounded overflow-auto scrollbar-hidden p-4 gap-2 flex">
          <div className="indicator p-2 text-center text-xs min-w-18  flex items-center justify-center bg-green-900 rounded-full ">
            <div className="flex items-center justify-center bg-base-300 gap-2   text-white place-items-center">
              User
              <FaArrowRight />
            </div>
          </div>

          {users.map((user, i) => (
            <BlurFade
              delay={0.15 + i * 0.15}
              blur="0px"
              direction="left"
              key={i}
              className="indicator p-2 text-center text-xs min-w-18  flex items-center justify-center bg-black rounded-full "
            >
              <span className="indicator-item status bg-green-400 rounded-full"></span>

              <div className="bg-base-300 grid text-white place-items-center">
                {user.userName}
              </div>
            </BlurFade>
          ))}
        </div>
        <div className="mb-60 m-2 rounded">
          {displayMessage?.map((mess, i) => {
            const current = mess.uid === user?.uid;
            return (
              <div
                key={i}
                className={`flex m-4 ${
                  current ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex flex-col">
                  <div
                    className={`opacity-60 text-xs  ${
                      current ? "text-right" : "text-left"
                    }`}
                  >
                    {mess.DisplayName}
                  </div>
                  <div
                    className={`rounded-md p-3 ${
                      current
                        ? "bg-zinc-800 text-white"
                        : "bg-white border-1 text-black"
                    }`}
                  >
                    {mess.text}
                    <div
                      className={`text-xs opacity-40 p-1 ${
                        current ? "text-right" : "text-left"
                      }`}
                    >
                      {mess.createdAt?.toDate ? (
                        mess.createdAt.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          hour12: true,
                          minute: "2-digit",
                        })
                      ) : (
                        <span className="loading loading-spinner loading-xs"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
