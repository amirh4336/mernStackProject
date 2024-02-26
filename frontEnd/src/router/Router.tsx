import { createBrowserRouter } from "react-router-dom";
import Users from "../user/pages/Users";
import NotFound from "../shared/pages/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Users/>
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;