import { useEffect, useState } from "react";
import { getCharacters } from "@/api/graphql/getCharacters/getCharacters";
import { Link } from "react-router-dom";
import CharacterItem from "@/components/characterItem/characterItem";
import { CiSearch } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { LayoutProps } from "./layout.interface";
import { IoArrowBack } from "react-icons/io5";
import { getStarredCharacters } from "@/functions/characterFunctions";
import { useFavoritesCharactersStore } from "@/storage/favoritesCharactersStore";

const Layout = ({ children }: LayoutProps) => {
  const [search, setSearch] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [characterSelected, setCharacterSelected] = useState(false);
  const { favorites } = useFavoritesCharactersStore();
  const [filterActive, setFilterActive] = useState(false);
  const [filter, setFilter] = useState({
    character: "",
    species: "",
  });
  const [starredCharacterData, setStarredCharacterData] = useState<any[]>([]);
  const [displayedCharacters, setDisplayedCharacters] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { loading, error, data } = getCharacters({ search });

  useEffect(() => {
    const characters = data?.characters?.results || [];
    setStarredCharacterData(
      characters.filter((character: any) => favorites.includes(character.name))
    );
    setDisplayedCharacters(
      characters.filter((character: any) => !favorites.includes(character.name))
    );
  }, [data, favorites]);

  return (
    <div className="flex min-h-screen bg-white">
      {isMobileView && characterSelected ? (
        <div className="flex-1">
          <button onClick={() => setCharacterSelected(false)} className="p-2">
            <IoArrowBack className="w-6 h-6 text-primary-600" />
          </button>
          {children}
        </div>
      ) : (
        <div className="px-4 py-4 w-full md:w-auto">
          {/* List Title */}
          <h1 className="text-xl font-semibold mb-4">Rick and Morty list</h1>
          {/* Search Header */}
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for results"
                className="w-full pl-8 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
              />
              <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <GiSettingsKnobs
              onClick={() => setFilterActive(!filterActive)}
              className={`text-primary-600 cursor-pointer hover:bg-primary-200 ${
                filterActive ? "bg-primary-200" : ""
              }`}
            />
          </div>

          {/* Filter Section */}
          {filterActive && (
            <div className="mb-6">
              <div className="space-y-4">
                {/* Character Filter */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Character</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full bg-primary-50 text-primary-600">
                      All
                    </button>
                    <button className="px-4 py-2 rounded-full bg-white border border-gray-200">
                      Starred
                    </button>
                    <button className="px-4 py-2 rounded-full bg-white border border-gray-200">
                      Others
                    </button>
                  </div>
                </div>

                {/* Species Filter */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Specie</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full bg-primary-50 text-primary-600">
                      All
                    </button>
                    <button className="px-4 py-2 rounded-full bg-white border border-gray-200">
                      Human
                    </button>
                    <button className="px-4 py-2 rounded-full bg-white border border-gray-200">
                      Alien
                    </button>
                  </div>
                </div>

                {/* Filter Button */}
                <button className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg">
                  Filter
                </button>
              </div>
            </div>
          )}

          {/* Loading and Error */}
          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {/* Starred Character List */}
          {starredCharacterData && starredCharacterData.length > 0 && (
            <>
              <h3 className="text-lg font-medium mb-2">
                Starred Characters ({starredCharacterData.length})
              </h3>
              <div className="space-y-4 mb-6">
                {starredCharacterData.map((character: any) => (
                  <Link
                    to={`/character/${character.name}`}
                    key={character.name}
                    onClick={() => setCharacterSelected(true)}
                  >
                    <CharacterItem {...character} />
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Characters List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">
              Characters ({displayedCharacters.length})
            </h3>
            {displayedCharacters.map((character: any) => (
              <Link
                to={`/character/${character.name}`}
                key={character.name}
                onClick={() => setCharacterSelected(true)}
              >
                <CharacterItem {...character} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {!isMobileView && children}
    </div>
  );
};

export default Layout;
