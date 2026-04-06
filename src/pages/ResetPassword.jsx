import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input } from "antd";
import useResetPassword from "../hooks/useResetPassword";
import HourGlass from "../components/HourGlass";

function ResetPassword() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, handlePasswordReset } = useResetPassword();

  const newPassword = watch("password");

  const onSubmit = async (data) => {
    handlePasswordReset({
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  };

  if (isLoading) {
    return <HourGlass />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <img
          src={"/SmartPOS.png"}
          alt="logo"
          className="w-24 h-auto mx-auto mb-6"
        />

        <h2 className="text-lg font-semibold text-center mb-4">
          Reset Your Password
        </h2>

        <Form
          layout="vertical"
          className="font-poppins"
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item
            className="font-semibold"
            label="New Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Please enter the password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter your new password"
                  className="rounded-lg"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            className="font-semibold"
            label="Confirm Password"
            validateStatus={errors.passwordConfirm ? "error" : ""}
            help={errors.passwordConfirm?.message}
          >
            <Controller
              name="passwordConfirm"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Confirm your password"
                  className="rounded-lg"
                />
              )}
            />
          </Form.Item>

          <div className="flex justify-center pt-4">
            <Button className="mr-5 " type="default" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
