import { auth } from "../../firebase";
import { IoLogOut } from "react-icons/io5";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
export default function Drawer() {
  // const user = auth.currentUser;
  const router = useRouter();
  const [open, isOpen] = useState(false);
  const Logouts = () => {
    isOpen(true)
  };
  const Logout = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
    } catch (err) {
      console.log(err);
      alert("something went wrong!");
    }
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-red-800">Logout!</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-white text-black border">
              Cancel
            </AlertDialogAction>
            <AlertDialogAction onClick={Logout} className="bg-red-800">
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="">
        <div className="drawer-content">
          <Button onClick={Logouts}>
            <IoLogOut className="text-red-700" size={24} />
          </Button>
        </div>
      </div>
    </>
  );
}
