import {
  addCharacterToFavorite,
  removeCharacterFromFavorite,
} from "@/functions/characterFunctions";
import { create } from "zustand";

interface FavoritesCharactersState {
  favorites: string[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
  isCharacterFavorite: (name: string) => boolean;
}

export const useFavoritesCharactersStore = create<FavoritesCharactersState>(
  (set, get) => ({
    favorites: [],
    isCharacterFavorite: (name: string) => {
      return get().favorites.includes(name);
    },
    addFavorite(name) {
      addCharacterToFavorite(name);
      set((state) => ({
        favorites: [...state.favorites, name],
      }));
    },
    removeFavorite(name) {
      removeCharacterFromFavorite(name);
      set((state) => ({
        favorites: state.favorites.filter((favorite) => favorite !== name),
      }));
    },
  })
);
