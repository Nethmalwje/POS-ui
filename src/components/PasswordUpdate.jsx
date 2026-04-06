import React from "react";
import { useForm, Controller } from "react-hook-form";
import Password from "./Password";
import { Button } from "antd";
import useUpdatePassword from "../hooks/useUpdatePassword";
import HourGlass from "./HourGlass";

function PasswordUpdate() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, handlePasswordUpdate } = useUpdatePassword();

  const onSubmit = (data) => {
    handlePasswordUpdate({
      currentPassword: data.currentPassword,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  };

  const newPassword = watch("password");

  if (isLoading) {
    return <HourGlass />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-red-100 rounded-xl p-6 shadow-md"
    >
      <h1 className="text-lg font-bold text-center mb-4 text-red-500">
        Password Update Section
      </h1>
      <h1 className="text-sm font-poppins text-red-500 font-semibold mb-4">
        Note: Once you updated your password, you will be logged out. Please log
        in again with your new password.
      </h1>
      <div className="w-full md:w-1/2">
        <Controller
          name="currentPassword"
          control={control}
          rules={{
            required: "Current Password is required",
          }}
          render={({ field }) => (
            <Password
              text="Current Password"
              {...field}
              error={errors.currentPassword}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "New Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          }}
          render={({ field }) => (
            <Password text="New Password" {...field} error={errors.password} />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={control}
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === newPassword || "The passwords do not match",
          }}
          render={({ field }) => (
            <Password
              text="Confirm Password"
              {...field}
              error={errors.passwordConfirm}
            />
          )}
        />
      </div>
      <div className="flex flex-row justify-center">
        <Button className="mr-4" type="default" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="primary" htmlType="submit">
          Update Password
        </Button>
      </div>
    </form>
  );
}

export default PasswordUpdate;
