import { Input } from "antd";
import { Controller } from "react-hook-form";

function Name({ errors, control, name, currentUserRole }) {
  return (
    <>
      {" "}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {currentUserRole !== "Cashier" ? "Employee Name" : "Customer Name"}
        </label>
        <Controller
          name="name"
          defaultValue={name}
          control={control}
          rules={{
            required: {
              value: true,
              message:
                currentUserRole !== "Cashier"
                  ? "Employee Name is required"
                  : "Customer Name is required",
            },
            pattern: {
              value: /^[A-Za-z_ ]+$/,
              message: `${
                currentUserRole !== "Cashier"
                  ? "Employee Name"
                  : "Customer Name"
              } can only contain letters, spaces, or underscores`,
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder={
                currentUserRole !== "Cashier"
                  ? "Enter Employee Name"
                  : "Enter Customer Name"
              }
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
    </>
  );
}

export default Name;
