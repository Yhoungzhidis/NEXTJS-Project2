"use client";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

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
const SidebarItem = ({ item }: { item: Sidebaritem }) => {
  const { name, icon: Icon, path } = item;
  const router = useRouter();
  const pathname = usePathname();
  const onClick = () => {
    router.push(path);
  };

  const isActive = useMemo(() => { return path === pathname;}, [path, pathname])
  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-300 cursor-pointer hover:text-sky-900 ${isActive && "text-sky-900 bg-sidebar-active"}`}
      onClick={onClick}
    >
      <Icon size={22} />

      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
};

export default SidebarItem;
