import { HiOutlineMenuAlt3 } from "react-icons/hi";
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
  const user = auth.currentUser;
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
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button ">
            <HiOutlineMenuAlt3 size={20} className="text-white" />
          </label>
        </div>
        <div className="drawer-side z-50 text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  bg-black min-h-full w-60 p-4">
            <li className="flex items-center  flex-row text-xl mb-10">
              <Button onClick={Logouts}>
                <IoLogOut className="text-red-700" size={24} />
              </Button>
              <div>{user?.displayName}</div>
            </li>
            {/* <li>User List</li>
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
