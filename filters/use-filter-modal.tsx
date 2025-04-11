import { create } from "zustand";

export interface ModalCompanyData {
  searchTerm?: string;
}

export interface ModalStore {
  onSearch: ({}: { companyData?: ModalCompanyData }) => void;
  companyData: ModalCompanyData;
}

export const useFilterModal = create<ModalStore>((set) => ({
  companyData: {},
  onSearch: ({ companyData = {} }) => set({ companyData }),
}));
