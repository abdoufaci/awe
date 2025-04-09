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

export const CreateQuoteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isModalOpen = isOpen && type === "createQuote";

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onOpen("editOrder", data)}>
      <DialogContent className="bg-white text-black w-full max-w-2xl">
        <DialogHeader className="py-2 ">
          <DialogTitle
            hidden
            className="text-xl text-[#25201C] font-semibold text-left">
            Ajouter entreprise
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <CreateQuoteForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
