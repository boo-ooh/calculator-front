import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  const navigate = useNavigate();

  const signIn = async (username: string, password: string) => {
    const data = await api.signIn(username, password);
    if (data.token) {
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
      return true;
    }
    navigate("/");
    return false;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
