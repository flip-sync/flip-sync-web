import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  modalType: string | null;
  modalProps: any;
  openModal: (type: string, props?: any) => void;
  closeModal: () => void;
}
 
export const useModal = create<ModalStore>((set: any) => ({
  isOpen: false,
  modalType: null,
  modalProps: null,
  openModal: (type: string, props: any = {}) =>
    set({ isOpen: true, modalType: type, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: null }),
}));
