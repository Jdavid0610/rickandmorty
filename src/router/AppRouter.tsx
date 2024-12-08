import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useRoutes } from "react-router-dom";
//import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";

//routes here
const AppRouter = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

export default AppRouter;
