/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// layout
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

// pages
const Users = lazy(() => import("../user/pages/Users"));
const NotFound = lazy(() => import("../shared/pages/NotFound"));
const NewPlaces = lazy(() => import("../places/pages/NewPlaces/NewPlaces"));
const UserPlaces = lazy(() => import("../places/pages/UserPlaces"));
const UpdatePlace = lazy(
  () => import("../places/pages/UpdatePlace/UpdatePlace")
);
const Auth = lazy(() => import("../user/pages/Auth/Auth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Users />
          </Suspense>
        ),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/places/new",
            element: (
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                <NewPlaces />
              </Suspense>
            ),
          },
          {
            path: "/places/:placeId",
            element: (
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                <UpdatePlace />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/:userId/places",
        element: (
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <UserPlaces />
          </Suspense>
        ),
      },
      {
        path: "/auth",
        element: (
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Auth />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
