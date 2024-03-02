import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Router";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, logout, login }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
