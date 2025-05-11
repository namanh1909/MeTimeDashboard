import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  open: (params?: { params?: unknown }) => void;
  close: () => void;
  params: unknown;
};

type AlertDeleteStore = {
  isAlertOpen: boolean;
  openAlert: (params?: { params?: unknown }) => void;
  closeAlert: () => void;
  alertParams: unknown;
};

const useModalStore = create<ModalStore & AlertDeleteStore>()((set) => ({
  isOpen: false,
  params: null,
  open: (params) => set({ isOpen: true, params: params?.params ?? null }),
  close: () => set({ isOpen: false, params: null }),
  isAlertOpen: false,
  alertParams: null,
  openAlert: (params) =>
    set({ isAlertOpen: true, alertParams: params?.params ?? null }),
  closeAlert: () => set({ isAlertOpen: false, alertParams: null }),
}));

export default useModalStore;
