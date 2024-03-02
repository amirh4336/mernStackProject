import { createBrowserRouter } from "react-router-dom";
import Users from "../user/pages/Users";
import NotFound from "../shared/pages/NotFound";
import NewPlaces from "../places/pages/NewPlaces/NewPlaces";
import RootLayout from "../layout/RootLayout";
import UserPlaces from "../places/pages/UserPlaces";
import UpdatePlace from "../places/pages/UpdatePlace/UpdatePlace";
import Auth from "../user/pages/Auth/Auth";

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
        path: "/places/:placeId",
        element: <UpdatePlace />,
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
