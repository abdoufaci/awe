"use client";

import CompanyCard from "@/app/[lang]/admin/companies/_components/company-card";
import { useFilterModal } from "@/filters/use-filter-modal";
import { Company } from "@prisma/client";

interface Props {
  companies: Company[];
  dict: any;
}

function ClientCompaniesFeed({ companies, dict }: Props) {
  const { companyData } = useFilterModal();

  return (
    <div className="flex flex-wrap items-center gap-5">
      {companies
        .filter((company) =>
          companyData?.searchTerm
            ? company.name
                .toLowerCase()
                .includes(companyData.searchTerm.toLocaleLowerCase())
            : true
        )
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

export default ClientCompaniesFeed;
