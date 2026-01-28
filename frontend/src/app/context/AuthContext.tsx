import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  user: { name?: string; email: string; picture?: string } | null;
  login: (token: string, user: { name?: string; email: string; picture?: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);