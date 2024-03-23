import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Router";
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

function App() {
  const { token, userId, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId: userId, logout, login }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
