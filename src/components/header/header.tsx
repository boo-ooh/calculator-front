import { Button, Tooltip } from "antd";
import "./header.css";
import { LogoutOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useApi } from "../../hooks/useApi";
import { OperationsContext } from "../../contexts/Operations/OperationContext";
// import { useApi } from "../../hooks/useApi";

export function Header() {
  const authCtx = useContext(AuthContext);
  const operationCtx = useContext(OperationsContext);
  const [userCredit, setUserCredit] = useState<number>(0);
  const api = useApi();

  useEffect(() => {
    api.getUserCredit().then((res) => {
      setUserCredit(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(operationCtx.balance);
    setUserCredit(operationCtx.balance);
  }, [operationCtx.balance]);

  return (
    <div className="header">
      <div className="header-text">
        <h1>Welcome {authCtx.user?.username}!</h1>
        <h2>Your credit is ${userCredit.toFixed(2)}</h2>
      </div>
      <div className="header-logout">
        <Tooltip title="logout">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              authCtx.signOut();
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
