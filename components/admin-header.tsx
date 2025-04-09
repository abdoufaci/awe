"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

const title = {
  admin: "Dashboard",
  orders: "Orders",
  companies: "Companies",
  users: "Users",
  payment: "Payment",
  settings: "Settings",
  dashboard: "Dashboard",
};

function AdminHeader() {
  const pathname = usePathname();
  const mainPart = pathname.trim().split("/")[3];
  const user = useCurrentUser();

  return (
    <div className="w-full h-[66px] border-b p-5 flex items-center justify-between sticky top-0 left-0 z-50 bg-white">
      <h1 className="text-xl font-medium">
        {
          //@ts-ignore
          mainPart ? title[mainPart] : "Dashboard"
        }
      </h1>
      <Avatar>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback className="bg-brand/10 cursor-pointer">
          {user?.name?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default AdminHeader;
