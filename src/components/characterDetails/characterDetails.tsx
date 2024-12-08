import { getCharacters } from "@/api/graphql/getCharacters/getCharacters";
import { useEffect, useState } from "react";
import { CharacterDetailsProps } from "./characterDetails.interface";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import {
  addCharacterToFavorite,
  isCharacterFavorite,
  removeCharacterFromFavorite,
} from "@/functions/characterFunctions";

const CharacterDetails = ({ name }: CharacterDetailsProps) => {
  const { loading, error, data } = getCharacters({ search: name || "" });
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(isCharacterFavorite(name!));
  }, [name]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeCharacterFromFavorite(name!);
    } else {
      addCharacterToFavorite(name!);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data?.characters?.results[0];

  return (
    <div className="min-h-screen bg-white">
      {character ? (
        <div className="px-4 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <button
                  onClick={toggleFavorite}
                  className=" absolute bottom-[-10px] right-[-10px] rounded-full bg-white p-2"
                >
                  {isFavorite ? (
                    <FaHeart className="w-4 h-4 text-secondary-600" />
                  ) : (
                    <CiHeart className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{character.name}</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Species</h3>
              <p className="text-sm">{character.species}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <p className="text-sm">{character.status}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Occupation</h3>
              <p className="text-sm">{character.location.name}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Gender</h3>
              <p className="text-sm">{character.gender}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-4">No character found</p>
      )}
    </div>
  );
};

export default CharacterDetails;
