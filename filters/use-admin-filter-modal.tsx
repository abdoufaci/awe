import { create } from "zustand";

export interface ModalCompanyData {
  searchTerm?: string;
  category?: string;
}

export interface ModalOrdersData {
  searchTerm?: string;
}

export interface ModalPaymentsData {
  searchTerm?: string;
}

export interface ModalStore {
  onSearch: ({}: {
    companyData?: ModalCompanyData;
    ordersData?: ModalOrdersData;
    paymentsData?: ModalPaymentsData;
  }) => void;
  companyData: ModalCompanyData;
  ordersData: ModalOrdersData;
  paymentsData: ModalPaymentsData;
}

export const useAdminFilterModal = create<ModalStore>((set) => ({
  companyData: {},
  ordersData: {},
  paymentsData: {},
  onSearch: ({ companyData = {}, ordersData = {}, paymentsData = {} }) =>
    set({ companyData, ordersData, paymentsData }),
}));
