import React from "react";
import CompanySearchFilter from "./company-search-filter";
import CategoryFilter from "./category-filter";
import AddCompanyButton from "./add-company-button";

interface Props {
  dict: any;
}

function CompaniesHeader({ dict }: Props) {
  return (
    <div className="flex items-center justify-between">
      <CompanySearchFilter dict={dict} />
      <div className="flex items-center gap-5">
        <CategoryFilter dict={dict} />
        <AddCompanyButton dict={dict} />
      </div>
    </div>
  );
}

export default CompaniesHeader;
