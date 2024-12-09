import { useState } from "react";
import { CharacterItemProps } from "./characterItem.interface";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useFavoritesCharactersStore } from "@/storage/favoritesCharactersStore";

const CharacterItem = ({ name, image, species }: CharacterItemProps) => {
  const { isCharacterFavorite, addFavorite, removeFavorite } =
    useFavoritesCharactersStore();
  const [isFavorite, setIsFavorite] = useState(isCharacterFavorite(name!));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(name!);
    } else {
      addFavorite(name!);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div key={name} className="flex items-center gap-3 p-2 hover:bg-gray-50">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-xs text-gray-500">{species}</p>
      </div>

      <div onClick={toggleFavorite}>
        {isFavorite ? (
          <FaHeart className="w-4 h-4 text-secondary-600" />
        ) : (
          <CiHeart className="w-4 h-4 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default CharacterItem;
