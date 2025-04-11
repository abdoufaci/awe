"use client";

import { Company } from "@prisma/client";
import CompanyCard from "./company-card";
import { useAdminFilterModal } from "@/filters/use-admin-filter-modal";

interface Props {
  companies: Company[];
  dict: any;
}

function CompaniesFeed({ companies, dict }: Props) {
  const { companyData } = useAdminFilterModal();

  return (
    <div className="flex flex-wrap items-center gap-5">
      {companies
        .filter((company) => {
          const categoryRes =
            companyData.category && companyData.category !== "all"
              ? company.category === companyData.category
              : true;
          const searchRes = companyData.searchTerm
            ? company.name
                .toLowerCase()
                .includes(companyData.searchTerm.toLowerCase())
            : true;

          return categoryRes && searchRes;
        })
        .map((company) => (
          <CompanyCard
            link="/admin/companies"
            key={company.id}
            company={company}
            dict={dict}
          />
        ))}
    </div>
  );
}

export default CompaniesFeed;
