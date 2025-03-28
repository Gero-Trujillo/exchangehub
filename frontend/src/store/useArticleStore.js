import { create } from "zustand"; // Importa la función `create` de Zustand para crear un estado global

// Define el estado global relacionado con los artículos
export const useArticleStore = create((set, get) => ({
    articleToOffer: null, // Artículo que el usuario desea ofrecer en un intercambio
    articleToGive: null, // Artículo que el usuario desea dar en un intercambio

    // Actualiza el artículo que el usuario desea ofrecer
    setArticleToOffer: (article) => set({ articleToOffer: article }),

    // Actualiza el artículo que el usuario desea dar
    setArticleToGive: (article) => set({ articleToGive: article }),
}));