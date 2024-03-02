import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

const AuthLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace={true} />;
  }
  return <Outlet />;
};

export default AuthLayout;
