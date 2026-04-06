import { Input } from "antd";
import { Controller } from "react-hook-form";

function Address({ errors, control }) {
  return (
    <>
      {" "}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <Controller
          name="address"
          defaultValue={""}
          control={control}
          rules={{
            required: {
              value: true,
              message: "Address is required",
            },
          }}
          render={({ field }) => (
            <Input {...field} id="address" placeholder={"Enter Address"} />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
    </>
  );
}

export default Address;
