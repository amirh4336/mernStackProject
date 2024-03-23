import { createContext } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  userId: null | string;
  token: null | string;
  logout: () => void;
  login: (uid: string, token: string) => void;
}>({
  isLoggedIn: false,
  token: null,
  userId: null,
  logout: () => {},
  login: () => {},
});
