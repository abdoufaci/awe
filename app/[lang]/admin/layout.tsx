import { poppins } from "@/app/fonts";
import AdminHeader from "@/components/admin-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset style={poppins.style}>
        <AdminHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
