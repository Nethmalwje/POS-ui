import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const SellingPrice = ({ errors, control, selling_price }) => {
  return (
    <>
      <div>
        <label
          htmlFor="selling_price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Selling Price
        </label>
        <Controller
          name="selling_price"
          defaultValue={selling_price}
          control={control}
          rules={{
            required: "Selling Price is required",
            pattern: {
              value: /^[0-9.]+$/,
              message: "Selling Price can only contain numbers.",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="selling_price"
              placeholder="Enter Selling Price"
            />
          )}
        />
        {errors.selling_price && (
          <p className="text-red-500 text-xs mt-1">
            {errors.selling_price.message}
          </p>
        )}
      </div>
    </>
  );
};

export default SellingPrice;
