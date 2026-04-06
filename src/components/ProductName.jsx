import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const ProductName = ({ errors, control, product_name }) => {
  return (
    <>
      {" "}
      <div>
        <label
          htmlFor="product_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Name
        </label>
        <Controller
          name="product_name"
          defaultValue={product_name}
          control={control}
          rules={{
            required: "Product Name is required",

            pattern: {
              value: /^[A-Za-z_ ]+$/,
              message:
                "Product Name can only contain letters, spaces, or underscores",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="product_name"
              placeholder="Enter Product Name"
            />
          )}
        />
        {errors.product_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.product_name.message}
          </p>
        )}
      </div>
    </>
  );
};

export default ProductName;
