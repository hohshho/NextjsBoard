import { create } from "zustand";

export const useCurrentPageStore = create<{
    page: string,
    list: () => void,
    write: () => void,
    search: () => void,
    detail: () => void
}>((set, get) => ({
    page: "list",
    list: () => {
        set({page: "list"})
    },
    write: () => {
        set({page: "write"})
    },
    edit: () => {
        set({page: "edit"})
    },
    search: () => {
        set({page: "search"})
    },
    detail: () => {
        set({page: "detail"})
    }
}));