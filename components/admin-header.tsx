"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import Cart from "./cart";

const title = {
  admin: "Dashboard",
  orders: "Orders",
  companies: "Companies",
  users: "Users",
  payments: "Payment",
  settings: "Settings",
  dashboard: "Dashboard",
};

interface Props {
  dict: any;
}

function AdminHeader({ dict }: Props) {
  const pathname = usePathname();
  const mainPart = pathname.trim().split("/")[3];
  const user = useCurrentUser();

  return (
    <div className="w-full h-[66px] border-b p-5 flex items-center justify-between sticky top-0 left-0 z-50 bg-white">
      <h1 className="text-xl font-medium">
        {pathname.startsWith("/fr/companies") ||
        pathname.startsWith("/en/companies")
          ? ""
          : //@ts-ignore
          mainPart
          ? //@ts-ignore
            title[mainPart]
          : "Dashboard"}
      </h1>
      <div className="flex items-center gap-3">
        {/* {!mainPart && (
          <>
            <Cart dict={dict} />
          </>
        )} */}
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-brand/10 cursor-pointer">
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default AdminHeader;
