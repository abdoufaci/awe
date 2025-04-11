import { poppins } from "@/app/fonts";
import AdminHeader from "@/components/admin-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getDictionary } from "../../dictionaries";
import Header from "@/components/header";

interface Props {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

async function CompaniesLayout({ children, params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <div>
      <Header dict={dict} />
      {children}
    </div>
  );
}

export default CompaniesLayout;
