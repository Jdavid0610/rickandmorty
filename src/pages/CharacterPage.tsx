import { useParams } from "react-router-dom";

import CharacterDetails from "@/components/characterDetails/characterDetails";

const CharacterPage = () => {
  const { name } = useParams<{ name: string }>();
  if (!name) {
    return (
      <div className="text-center text-2xl font-bold mt-10">
        No character selected
      </div>
    );
  }

  return <CharacterDetails name={name} />;
};

export default CharacterPage;
