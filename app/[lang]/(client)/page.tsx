import { currentUser } from "@/lib/auth";
import { getDictionary } from "../dictionaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cart from "@/components/cart";

export default async function Home({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const user = await currentUser();

  return (
    <main className="flex items-center justify-between p-10 pr-20">
      {!user ? (
        <Button asChild>
          <Link href={"/auth/login"}>Login</Link>
        </Button>
      ) : (
        <div className="space-x-5">
          <Button asChild>
            <Link href={"/admin"}>Admin</Link>
          </Button>
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        </div>
      )}
      <Cart dict={dict} />
    </main>
  );
}
