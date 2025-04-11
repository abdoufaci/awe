import React from "react";
import { getDictionary } from "../../dictionaries";
import { getCompanies } from "@/backend/queries/admin/get-companies";
import CompanyCard from "../../admin/companies/_components/company-card";
import ClientCompaniesFeed from "./_components/client-companies-feed";
import ClientCompanySearchFilter from "./_components/client-company-search-filter";
import CompaniesNavigation from "@/components/companies-navigations";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCompaniesByCategory } from "@/backend/queries/client/get-companies-by-category";

interface Props {
  params: {
    lang: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

async function CompaniesPage({ params: { lang }, searchParams }: Props) {
  const dict = await getDictionary(lang);
  const category = searchParams.category as string;
  const companies = await getCompaniesByCategory(category);

  return (
    <SidebarProvider className="flex items-start gap-5 pt-4">
      <CompaniesNavigation dict={dict} />
      <SidebarInset>
        <div className="p-5 space-y-7">
          <ClientCompanySearchFilter dict={dict} />
          <ClientCompaniesFeed companies={companies} dict={dict} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default CompaniesPage;
