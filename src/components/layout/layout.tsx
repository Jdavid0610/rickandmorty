import { useEffect, useState } from "react";
import { getCharacters } from "@/api/graphql/getCharacters/getCharacters";
import { Link } from "react-router-dom";
import CharacterItem from "@/components/characterItem/characterItem";
import { CiSearch } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { LayoutProps } from "./layout.interface";
import { IoArrowBack } from "react-icons/io5";

const Layout = ({ children }: LayoutProps) => {
  const [search, setSearch] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [characterSelected, setCharacterSelected] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { loading, error, data } = getCharacters({ search });

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
            <GiSettingsKnobs className="text-primary-600" />
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {/* Characters List */}
          <div className="space-y-4">
            {data?.characters?.results?.map((character: any) => (
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
    </div>
  );
};

export default Layout;
