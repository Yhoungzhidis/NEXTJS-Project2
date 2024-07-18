"use client";
import Image from "next/image";
import React from "react";
import styles from "@/components/sidebar/Sidebar.module.css"
import {
  LayoutDashboard,
  CircleUser,
  Wallet,
  Book,
  LucideIcon,
  LogOutIcon,
  CalendarCheck,
  School,
} from "lucide-react";

import SidebarItem from "@/components/item";
import Sidebaritem from "@/components/item";
import { useSession } from "next-auth/react";

interface Sidebaritem {
  name: string;
  icon: LucideIcon;
  path: string;
  items?: SubItem[];
}

interface SubItem {
  name: string;
  path: string;
}

const items: Sidebaritem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: CircleUser,
  },
  {
    name: "Finance info",
    path: "/finance",
    icon: Wallet,
  },
  {
    name: "Register Courses",
    path: "/register",
    icon: Book,
  },
  {
    name: "Assignments",
    path: "/assignments",
    icon: School,
  },
  {
    name: "Events",
    path: "/events",
    icon: CalendarCheck,
  },
  {
    name: "Log out",
    path: "/sign-in",
    icon: LogOutIcon,
  },
];
const Sidebar = () => {
  const {data:session} = useSession();
  return (
    <>
    {session ? (
      <>
       <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/noavatar.png" alt="" width={50} height={50}/>
        <div className={styles.userDetail}>
          <span className={styles.username}>{session.user?.name}</span>
          <span className={styles.userTitle}>{session.user?.email}</span>
          </div>
      </div>
      <div className="flex flex-col space-y-10 w-full ">
        <div  className="flex flex-col space-y-2 bg-blue ">
          {items.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
      </>
    ):(
      <>
      </>
    )}
    </>
  );
};

export default Sidebar;
