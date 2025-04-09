import { create } from "zustand";

export interface ModalCompanyData {
  searchTerm?: string;
  category?: string;
}

export interface ModalOrdersData {
  searchTerm?: string;
}

export interface ModalStore {
  onSearch: ({}: {
    companyData?: ModalCompanyData;
    ordersData?: ModalOrdersData;
  }) => void;
  companyData: ModalCompanyData;
  ordersData: ModalOrdersData;
}

export const useAdminFilterModal = create<ModalStore>((set) => ({
  companyData: {},
  ordersData: {},
  onSearch: ({ companyData = {}, ordersData = {} }) =>
    set({ companyData, ordersData }),
}));
