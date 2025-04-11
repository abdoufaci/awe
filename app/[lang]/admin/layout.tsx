import { poppins } from "@/app/fonts";
import AdminHeader from "@/components/admin-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getDictionary } from "../dictionaries";

interface Props {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default async function RootLayout({
  children,
  params: { lang },
}: Props) {
  const dict = await getDictionary(lang);

  return (
    <SidebarProvider>
      <AppSidebar dict={dict} />
      <SidebarInset className={poppins.className}>
        <AdminHeader dict={dict} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
