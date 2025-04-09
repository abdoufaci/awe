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
import { UploadDocumentForm } from "../forms/upload-document-form";

export const UploadDocumentModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const { dict, order } = data;

  const isModalOpen = isOpen && type === "uploadDocument";

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => onOpen("clientQuote", { dict, order })}>
      <DialogContent className="bg-white text-black w-full max-w-3xl">
        <DialogHeader className="py-2 ">
          <DialogTitle
            hidden
            className="text-xl text-[#25201C] font-semibold text-left">
            Ajouter entreprise
          </DialogTitle>
        </DialogHeader>
        <UploadDocumentForm />
      </DialogContent>
    </Dialog>
  );
};
