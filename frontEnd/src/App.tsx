import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Router";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string| null>(null);

  const login = useCallback((uid: string) => {
    setIsLoggedIn(true);
    setUserId(uid)
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn , userId: userId, logout, login }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
