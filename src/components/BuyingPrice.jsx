import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const BuyingPrice = ({ errors, control, buying_price }) => {
  return (
    <>
      <div>
        <label
          htmlFor="buying_price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Buying Price
        </label>
        <Controller
          name="buying_price"
          defaultValue={buying_price}
          control={control}
          rules={{
            required: "Buying Price is required",
            pattern: {
              value: /^[0-9.]+$/,
              message: "Buying Price can only contain numbers.",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="buying_price"
              placeholder="Enter Buying Price"
            />
          )}
        />
        {errors.buying_price && (
          <p className="text-red-500 text-xs mt-1">
            {errors.buying_price.message}
          </p>
        )}
      </div>
    </>
  );
};

export default BuyingPrice;
