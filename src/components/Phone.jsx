import { Input } from "antd";
import { Controller } from "react-hook-form";

function Phone({ errors, control, phone, isLoggedUser }) {
  return (
    <>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {isLoggedUser ? "Contact Number" : "Mobile Number"}
        </label>
        <Controller
          name="phone"
          defaultValue={phone}
          control={control}
          rules={{
            required: "Mobile Number is required",
            pattern: {
              value: /^0\d{9}$/,
              message:
                "Mobile Number must start with 0 and be exactly 10 digits",
            },
            validate: {
              length: (value) =>
                value.length === 10 ||
                "Mobile Number must be exactly 10 digits",
              startsWithZero: (value) =>
                value.startsWith("0") || "Mobile Number must start with 0",
              digitsOnly: (value) =>
                /^\d+$/.test(value) || "Mobile Number must contain only digits",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="phone"
              placeholder="Enter Mobile Number"
              maxLength={10}
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
    </>
  );
}

export default Phone;
