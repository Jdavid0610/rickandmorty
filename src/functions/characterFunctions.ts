import { getValue, removeValue, saveValue } from "@/common/Storage";

export const isCharacterFavorite = (name: string) => {
  const favorites: string[] = Object.values(
    getValue("favorites") || []
  ) as string[];

  return favorites.includes(name);
};

export const addCharacterToFavorite = (name: string) => {
  const favorites: string[] = Object.values(
    getValue("favorites") || []
  ) as string[];
  favorites.push(name);
  saveValue("favorites", favorites);
};

export const removeCharacterFromFavorite = (name: string) => {
  const favorites: string[] = Object.values(
    getValue("favorites") || []
  ) as string[];

  const updatedFavorites = favorites.filter((fav) => fav !== name);

  if (updatedFavorites.length > 0) {
    saveValue("favorites", updatedFavorites);
  } else {
    removeValue("favorites");
  }
};

export const getStarredCharacters = () => {
  const favorites: string[] = Object.values(
    getValue("favorites") || []
  ) as string[];
  return favorites;
};
