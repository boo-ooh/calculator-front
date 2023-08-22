import { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  signIn: (username: string, password: string) => Promise<boolean | undefined>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);
