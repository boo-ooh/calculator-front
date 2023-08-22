import { Button, Divider, Space, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import "./operationsBar.css";
import { useApi } from "../../hooks/useApi";
import { Operation } from "../../types/Operation";
import OperationsModal from "./operationsModal/operationsModal";

const OperationsBar: React.FC = () => {
  const [operationsList, setOperationsList] = useState<Operation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operation, setOperation] = useState<Operation | null>(null);
  const api = useApi();

  useEffect(() => {
    api.getOperations().then((res) => {
      setOperationsList(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOperation = (operation: Operation) => {
    setOperation(operation);
    setIsModalOpen(true);
  };

  return (
    <>
      <Divider>Operations</Divider>
      <OperationsModal
        operation={operation}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Space>
        {operationsList.map((op: Operation) => (
          <Tooltip title={"$" + op.cost} key={op.id}>
            <Button
              type="primary"
              key={op.type}
              onClick={() => handleOperation(op)}
            >
              {op.displayName}
            </Button>
          </Tooltip>
        ))}
      </Space>
    </>
  );
};

export default OperationsBar;
