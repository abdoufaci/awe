import React from "react";
import CompaniesHeader from "./_components/companies-header";
import { getDictionary } from "../../dictionaries";
import { getCompanies } from "@/backend/queries/admin/get-companies";
import CompaniesFeed from "./_components/companies-feed";

async function ComapaniesPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const companies = await getCompanies();

  return (
    <div className="p-5 space-y-7">
      <CompaniesHeader dict={dict} />
      <CompaniesFeed companies={companies} dict={dict} />
    </div>
  );
}

export default ComapaniesPage;
