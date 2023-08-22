import React from "react";
import { Button, Form, Input, Modal } from "antd";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from "react";

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const [errorModal, contextHolder] = Modal.useModal();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const success = await auth.signIn(values.username, values.password);
    if (!success) {
      errorModal.error({
        title: "Error",
        content: <h2>Could not log you in, verify credentials.</h2>,
      });
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>
  );
};

export default Login;
