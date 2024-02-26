import { createBrowserRouter } from "react-router-dom";
import Users from "../user/pages/Users";
import NotFound from "../shared/pages/NotFound";
import NewPlaces from "../places/pages/NewPlaces";
import RootLayout from "../layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/places/new",
        element: <NewPlaces />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
