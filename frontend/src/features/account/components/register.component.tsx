import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../apis/account.api";
import { User } from "../../../shared/lib/models";
import { alert } from "../../../shared/lib/services";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: User) => {
    try {
      registerApi(values).then((response) => {
        console.log({ data: response });
      });
      alert.success("Registration Successful!");
      navigate("/account/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (e.g., show an error message)
      alert.error("Please try again", "Failed to register user");
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        firstName: "One",
        lastName: "User",
        email: "one@grr.la",
        password: "password123!",
        confirmPassword: "password123!",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your First Name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your Last Name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters long!",
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("values don't match");
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      <div className="flex justify-center">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </div>
      <div className="flex justify-center gap-2  mt-4 ">
        <span className="text-light-gray">Already have an account?</span>{" "}
        <span
          onClick={() => navigate(`/account/login`)}
          className="text-blue-500 cursor-pointer"
        >
          Sign in
        </span>
      </div>
    </Form>
  );
};

export default Register;