"use client";

import { AddCompanyModal } from "@/components/modals/add-company-modal";
import { ClientDetailsModal } from "@/components/modals/client-details-modal";
import { ClientQuoteModal } from "@/components/modals/client-quote-modal";
import { CreateQuoteModal } from "@/components/modals/create-quote-modal";
import { EditOrderModal } from "@/components/modals/edit-order-modal";
import { ReviewDocumentModal } from "@/components/modals/review-document-modal";
import { UploadDocumentModal } from "@/components/modals/upload-document-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  //code for hydrations error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  //code for hydrations error

  return (
    <>
      <AddCompanyModal />
      <EditOrderModal />
      <CreateQuoteModal />
      <ClientQuoteModal />
      <UploadDocumentModal />
      <ReviewDocumentModal />
      <ClientDetailsModal />
    </>
  );
};
