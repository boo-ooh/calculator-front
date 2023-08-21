import { Button, Tooltip } from "antd";
import "./header.css";
import { LogoutOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export function Header() {
  const auth = useContext(AuthContext);
  return (
    <div className="header">
      <div className="header-text">
        <h1>Welcome {auth.user?.username}!</h1>
        <h2>Your credit is ${auth.user?.balance.toFixed(2)}</h2>
      </div>
      <div className="header-logout">
        <Tooltip title="logout">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              auth.signOut();
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
