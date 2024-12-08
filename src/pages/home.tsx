import { useState } from "react";
import { getCharacters } from "@/api/graphql/getCharacters/getCharacters";

const Home = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data } = getCharacters({ search });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search characters..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.characters?.results?.map((character: any) => (
              <div
                key={character.name}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {character.name}
                  </h3>
                  <p className="text-gray-600">Species: {character.species}</p>
                  <p className="text-gray-600">Status: {character.status}</p>
                  <p className="text-gray-600">
                    Location: {character.location.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
