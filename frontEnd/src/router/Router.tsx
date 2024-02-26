import { createBrowserRouter } from "react-router-dom";
import Users from "../user/pages/Users";
import NotFound from "../shared/pages/NotFound";
import NewPlaces from "../places/pages/NewPlaces";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Users/>
  },
  {
    path: "/places/new",
    element: <NewPlaces />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;