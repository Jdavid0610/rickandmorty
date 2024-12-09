import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CharacterDetails from "./characterDetails";
import { useFavoritesCharactersStore } from "@/storage/favoritesCharactersStore";

vi.mock("@/api/graphql/getCharacters/getCharacters", () => ({
  getCharacters: vi.fn(() => ({
    loading: false,
    error: null,
    data: {
      characters: {
        results: [
          {
            name: "Rick Sanchez",
            image: "rick.png",
            species: "Human",
            status: "Alive",
            location: { name: "Earth" },
            gender: "Male",
          },
        ],
      },
    },
  })),
}));

vi.mock("@/storage/favoritesCharactersStore", () => ({
  useFavoritesCharactersStore: vi.fn(() => ({
    isCharacterFavorite: vi.fn(() => false),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  })),
}));

describe("CharacterDetails Component", () => {
  it("renders character details correctly", () => {
    const { getByText } = render(<CharacterDetails name="Rick Sanchez" />);
    expect(getByText("Rick Sanchez")).toBeDefined();
    expect(getByText("Human")).toBeDefined();
    expect(getByText("Alive")).toBeDefined();
    expect(getByText("Earth")).toBeDefined();
    expect(getByText("Male")).toBeDefined();
  });

  it("toggles favorite status", () => {
    const { addFavorite, removeFavorite } = useFavoritesCharactersStore();
    const { getByRole } = render(<CharacterDetails name="Rick Sanchez" />);
    const button = getByRole("button");
    button.click();
    expect(addFavorite).toHaveBeenCalledWith("Rick Sanchez");
    button.click();
    expect(removeFavorite).toHaveBeenCalledWith("Rick Sanchez");
  });
});
