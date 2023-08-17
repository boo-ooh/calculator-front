import { Button, Divider, Space } from "antd";
import React from "react";
import "./operationsBar.css";

const OperationsBar: React.FC = () => (
  <>
    <Divider>Operations</Divider>
    <Space>
      <Button type="primary">Add</Button>
      <Button type="primary">Subtract</Button>
      <Button type="primary">Multiply</Button>
      <Button type="primary">Divide</Button>
      <Button type="primary">Square root</Button>
      <Button type="primary">Random String</Button>
    </Space>
  </>
);

export default OperationsBar;
