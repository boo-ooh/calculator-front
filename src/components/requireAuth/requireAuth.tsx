import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Login from "../login/login";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  console.log(auth);
  if (!auth.user) {
    return <Login />;
  }

  return children;
};
