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
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState(true);
  const [users, setUsers] = useState<{ name: string; userName: string }[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs.map(
        (doc) => doc.data() as { name: string; userName: string }
      );
      setUsers(usersData);
    };
    fetchUsers();
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
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: user?.uid,
        DisplayName: user?.displayName,
        email: user?.email,
      });
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
              Welcome <span className="text-red-800">{user?.displayName}!</span>
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
        <div className="border rounded-full overflow-auto p-4 gap-2 flex">
          
          {users.map((user, i) => (
            <div
              key={i}
              className="p-2 text-center text-xs min-w-20 border-3 bg-black border-green-700 text-white rounded-full "
            >
              {user.userName}
            </div>
          ))}
          <div className="p-2 text-center text-xs min-w-20 border-3 bg-black border-green-700 text-white rounded-full ">
            k
          </div>
          <div className="p-2 text-center text-xs min-w-20 border-3 bg-black border-green-700 text-white rounded-full ">
            k
          </div>
          <div className="p-2 text-center text-xs min-w-20 border-3 bg-black border-green-700 text-white rounded-full ">
            k
          </div>
          <div className="p-2 text-center text-xs min-w-20 border-3 bg-black border-green-700 text-white rounded-full ">
            k
          </div>
          <div className="p-2 text-center text-xs min-w-20 border-3 bg-black border-green-700 text-white rounded-full ">
            k
          </div>
        </div>
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
