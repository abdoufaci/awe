import { Prisma } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addReservation"
  | "reservationProgress"
  | "addWilaya"
  | "travelers"
  | "addTour"
  | "images"
  | "openTourFilter";

interface ModalData {
  wilaya?: any;
  tour?: any | null;
  images?: {
    url: string;
    key: string;
  }[];
  dict?: any;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData | null | any;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
