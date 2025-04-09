"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { ScrollArea } from "../ui/scroll-area";
import { AddCompanyForm } from "../forms/add-company-form";
import ClientDetailsBody from "../users/client-details-body";

export const ClientDetailsModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "clientDetails";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-full max-w-3xl">
        <DialogHeader className="py-2 ">
          <DialogTitle className="text-xl text-[#25201C] font-semibold text-left">
            Ajouter entreprise
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <ClientDetailsBody />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
