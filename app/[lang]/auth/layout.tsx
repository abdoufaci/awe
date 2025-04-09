import React from "react";
import { getDictionary } from "../dictionaries";
import Image from "next/image";
import { GoodTimes, Laviossa } from "@/app/fonts";

async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main
      style={{
        backgroundImage: "url('/auth-bg.png')",
      }}
      className="flex flex-col items-center gap-10 p-10 min-h-screen">
      <Image alt="logo" src={"/auth-logo.svg"} height={120} width={220} />
      <div className="h-full flex items-center justify-center">{children}</div>
    </main>
  );
}

export default AuthLayout;
