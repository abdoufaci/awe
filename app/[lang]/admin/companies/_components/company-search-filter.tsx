"use client";

import { Input } from "@/components/ui/input";
import { useAdminFilterModal } from "@/filters/use-admin-filter-modal";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  dict: any;
}

function CompanySearchFilter({ dict }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { onSearch, companyData } = useAdminFilterModal();

  useEffect(() => {
    onSearch({
      companyData: {
        ...companyData,
        searchTerm: debouncedSearchTerm,
      },
    });
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-full max-w-sm">
      <Input
        className="grow placeholder:text-[#A7ABAF] pl-9 h-10 rounded-xl text-xs placeholder:text-xs"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value);
        }}
        placeholder="Rechercher"
      />
      <Search className="absolute left-3 top-3 text-[#A7ABAF] size-4" />
    </div>
  );
}

export default CompanySearchFilter;
