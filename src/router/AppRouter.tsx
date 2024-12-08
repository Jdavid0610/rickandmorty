import NotFound from "@/pages/not-found";
import { useRoutes } from "react-router-dom";
import CharacterPage from "@/pages/CharacterPage";
//import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";

//routes here
const AppRouter = () => {
  const routes = useRoutes([
    { path: "/", element: <CharacterPage /> },
    { path: "/character/:name", element: <CharacterPage /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

export default AppRouter;
