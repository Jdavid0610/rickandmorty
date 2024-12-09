import NotFound from "@/pages/not-found";
import { useRoutes } from "react-router-dom";
import CharacterPage from "@/pages/CharacterPage";
import Layout from "@/components/layout/layout";
//import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";

//routes here
const AppRouter = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Layout>
          <CharacterPage />
        </Layout>
      ),
    },
    {
      path: "/character/:name",
      element: (
        <Layout>
          <CharacterPage />
        </Layout>
      ),
    },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

export default AppRouter;
