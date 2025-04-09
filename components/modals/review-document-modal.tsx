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
import { Button } from "../ui/button";
import { useTransition } from "react";
import { acceptBankAccount } from "@/backend/mutations/order/accept-bank-document";
import { toast } from "sonner";
import { useOrdersQuery } from "@/hooks/use-query-orders";

export const ReviewDocumentModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [isPending, startTransition] = useTransition();
  const { refetch } = useOrdersQuery();

  const { order, dict } = data;

  const isModalOpen = isOpen && type === "reviewDocument";

  const Accept = () => {
    startTransition(() => {
      acceptBankAccount(order?.id || "")
        .then(() => {
          toast.success("Success");
          onClose();
          refetch();
        })
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => onOpen("editOrder", { dict, order })}>
      <DialogContent className="bg-white text-black w-full max-w-3xl">
        <DialogHeader className="py-2 ">
          <DialogTitle
            hidden
            className="text-xl text-[#25201C] font-semibold text-left">
            Ajouter entreprise
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="w-full rounded-xl h-40 bg-[#D9D9D9]" />
          <div className="flex items-center gap-4">
            <Button
              disabled={isPending}
              onClick={Accept}
              size={"lg"}
              variant={"brand"}
              className="w-full">
              {dict?.orders.confirm}
            </Button>
            <Button
              disabled={isPending}
              size={"lg"}
              variant={"delete"}
              className="w-full">
              {dict?.orders.reject}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
