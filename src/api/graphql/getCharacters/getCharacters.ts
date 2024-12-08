import { gql, useQuery } from "@apollo/client";
import { getCharacters as GetCharactersType } from "./getCharacters.type";

const GET_CHARACTERS = gql`
  query Characters($name: String) {
    characters(filter: { name: $name }) {
      results {
        name
        species
        status
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;

export const getCharacters = ({ search }: GetCharactersType) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: search },
  });

  return { loading, error, data };
};
