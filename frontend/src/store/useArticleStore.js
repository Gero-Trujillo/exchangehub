import { create } from "zustand";

export const useArticleStore = create((set, get) => ({
    articleToOffer: null,
    articleToGive: null,

    setArticleToOffer: (article) => set({ articleToOffer: article }),
    setArticleToGive: (article) => set({ articleToGive: article }),
}));