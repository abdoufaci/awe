import { currentUser } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { GoodTimes } from "@/app/fonts";
import Cart from "./cart";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  dict: any;
}

async function Header({ dict }: Props) {
  const user = await currentUser();

  return (
    <div className="w-full h-[66px] border-b p-5 flex items-center justify-between sticky top-0 left-0 z-50 bg-white">
      <div className="flex flex-col items-center justify-center gap-1">
        <Image
          alt="logo"
          src={"/logo.svg"}
          height={100}
          width={150}
          className="object-cover"
        />
        <h1 style={GoodTimes.style} className="text-[#182233] text-[9px]">
          Algeria World Export
        </h1>
      </div>
      <div className="flex items-center gap-7">
        <Cart dict={dict} />
        <Button variant={"brandOutline"} className="rounded-lg" asChild>
          <Link href={"/dashboard/orders"}>{dict.general.viewYourQuotes}</Link>
        </Button>
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

export default Header;
