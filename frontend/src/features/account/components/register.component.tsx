import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../apis/account.api";
import { User } from "../../../shared/lib/models";
import { alert } from "../../../shared/lib/services";
import { formatErrorMessage } from "../../../shared/lib/helpers/format.error";
import { TopHeader } from "../ui/header";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: User) => {
    registerApi(values)
      .then(
        () => {
          alert.success("Registration Successful!");
          navigate("/account/login");
        },
        (err) => {
          alert.error(formatErrorMessage(err));
        }
      )
      .catch(() => {
        alert.error("Something went wrong", "Please try again!");
      });
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
      <TopHeader
        className=" mb-8"
        title="Welcome"
        caption="Register your account to get started."
      />
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
            validator(_rule, value) {
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
