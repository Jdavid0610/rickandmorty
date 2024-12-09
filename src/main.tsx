import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { getStarredCharacters } from "./functions/characterFunctions.ts";
import { useFavoritesCharactersStore } from "./storage/favoritesCharactersStore.ts";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const favorites = getStarredCharacters();

useFavoritesCharactersStore.setState({ favorites });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
