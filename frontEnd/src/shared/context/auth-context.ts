import { createContext } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  userId: null | string;
  token: null | string;
  logout: () => void;
  login: (uid: string, token: string , expiration?: Date) => void;
}>({
  isLoggedIn: false,
  token: null,
  userId: null,
  logout: () => {},
  login: () => {},
});
