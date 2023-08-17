import { Button, Tooltip } from "antd";
import "./header.css";
import { LogoutOutlined } from "@ant-design/icons";

interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  return (
    <div className="header">
      <div className="header-text">
        <h1>
          Welcome <b>{username}</b>!
        </h1>
        <h2>Your credit is $50</h2>
      </div>
      <div className="header-logout">
        <Tooltip title="logout">
          <Button type="text" icon={<LogoutOutlined />}>
            Logout
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
