"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { PlusIcon } from "lucide-react";

interface Props {
  dict: any;
}

function AddCompanyButton({ dict }: Props) {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addCompany", { dict })}
      variant={"brand"}
      className="font-normal">
      <PlusIcon className="w-4 h-4" />
      {dict.company.addCompany}
    </Button>
  );
}

export default AddCompanyButton;
