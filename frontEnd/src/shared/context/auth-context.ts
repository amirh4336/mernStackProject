import { createContext } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  userId: null | string;
  logout: () => void;
  login: (uid: string) => void;
}>({
  isLoggedIn: false,
  userId: null,
  logout: () => {},
  login: () => {},
});
