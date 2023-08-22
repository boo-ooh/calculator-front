import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Login from "../login/login";
import { useApi } from "./../../hooks/useApi";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const api = useApi();
  if (!auth.user) {
    if (localStorage.getItem("token") != null) {
      api.validateToken().then((res) => {
        if (res) {
          auth.setUser(res);
          return children;
        }
      });
    }
    return <Login />;
  } else {
    return children;
  }
};
