import { poppins } from "@/app/fonts";
import AdminHeader from "@/components/admin-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function DashboardLayout({
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

export default DashboardLayout;
