import { OrderWithProducts, UserWithOrders } from "@/types/types";
import { Prisma } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addCompany"
  | "editOrder"
  | "createQuote"
  | "clientQuote"
  | "uploadDocument"
  | "reviewDocument"
  | "clientDetails";

interface ModalData {
  dict?: any;
  order?: OrderWithProducts;
  client?: UserWithOrders;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: {}, isOpen: false }),
}));
