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
import OrdersBody from "../order/orders-body";
import { CreateQuoteForm } from "../forms/create-quote-form";
import ClientQuoteBody from "../order/client-quote-body";

export const ClientQuoteModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen =
    isOpen && (type === "clientQuote" || type === "uploadDocument");

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-full max-w-7xl">
        <DialogHeader className="py-2 ">
          <DialogTitle
            hidden
            className="text-xl text-[#25201C] font-semibold text-left">
            Ajouter entreprise
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          <ClientQuoteBody />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
