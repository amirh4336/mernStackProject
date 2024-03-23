import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/Router";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useEffect, useState } from "react";

let logoutTimer: number;

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string, expiration?: Date) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiration =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(undefined);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData") ?? "{}");
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId: userId, logout, login }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
