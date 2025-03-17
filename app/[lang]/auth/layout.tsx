import React from "react";
import { getDictionary } from "../dictionaries";

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
    <main>
      {/* <Header dict={dict} /> */}
      <div className="h-full flex items-center justify-center">{children}</div>
    </main>
  );
}

export default AuthLayout;
