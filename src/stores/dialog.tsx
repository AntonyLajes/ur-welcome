import { create } from "zustand";

type UseDialogType = {
    showDialog: boolean,
    setShowDialog: (b: boolean) => void
}

export const useDialog = create<UseDialogType>((set) => ({
    showDialog: false,
    setShowDialog(b) {
        set({showDialog: b})
    },
}))