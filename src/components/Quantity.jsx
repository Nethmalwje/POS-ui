import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const Quantity = ({ errors, control, quantity }) => {
  return (
    <>
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quantity
        </label>
        <Controller
          name="quantity"
          defaultValue={quantity}
          control={control}
          rules={{
            required: "Quantity is required",
            pattern: {
              value: /^(0(\.[0-9]{1,3})?|[1-9][0-9]*(\.[0-9]{1,3})?)$/,
              message: "Quantity must be positive.",
            },
          }}
          render={({ field }) => (
            <Input {...field} id="quantity" placeholder="Enter Quantity" />
          )}
        />
        {errors.quantity && (
          <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
        )}
      </div>
    </>
  );
};

export default Quantity;
