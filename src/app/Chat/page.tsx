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
  getDocs,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();
  const [message, setMessage] = useState("");

  const [dialog, setDialog] = useState(true);
  const [users, setUsers] = useState<{ name: string; userName: string }[]>([]);
  const [displayMessage, setDisplayMessage] =
    useState<{ text: string; DisplayName: string; createdAt: Timestamp }[]>();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(
        (doc) => doc.data() as { name: string; userName: string }
      );
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
          doc.data() as { text: string; DisplayName: string; createdAt: Timestamp }
      );
      setDisplayMessage(userMessages.reverse());
    });
    return () => messages();
  }, []);
  const Logout = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
    } catch (err) {
      console.log(err);
      alert("something went wrong!");
    }
  };
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
        <div className="text-white font-bold ">{user?.displayName}</div>
        <Button onClick={Logout} className="bg-red-800">
          Log out
        </Button>
      </div>
      <main className="h- max-w-2xl m-auto ">
        <div className="border rounded overflow-auto p-4 gap-2 flex">
          {users.map((user, i) => (
            <div
              key={i}
              className="p-2 text-center text-xs min-w-18  flex items-center justify-center  bg-black  text-white rounded-full "
            >
              {user.userName}
            </div>
          ))}
        </div>
        <div className="mb-60 m-2 rounded">
          {displayMessage?.map((user, i) => (
            <div key={i} className="flex mt-2 justify-end h-fit ">
              <div className="">
                <div className="text-xs text-right opacity-60">
                  {user.DisplayName}
                </div>
                <div className="border-2  p-4 rounded-lg bg-zinc-800 text-white relative ">
                  <div className="">{user.text}</div>
                  <div className="text-xs right-0 absolute  opacity-50  ">
                    {user.createdAt?.toDate() ? (
                      user.createdAt?.toDate().toLocaleString([], {
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
            </div>
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
