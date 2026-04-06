import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const BarcodeNo = ({ errors, control, barcode_no }) => {
  return (
    <>
      <div>
        <label
          htmlFor="barcode_no"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Barcode Number
        </label>
        <Controller
          name="barcode_no"
          defaultValue={barcode_no}
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Barcode number can only contain numbers.",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="barcode_no"
              placeholder="Enter Barcode Number"
            />
          )}
        />
        {errors.barcode_no && (
          <p className="text-red-500 text-xs mt-1">
            {errors.barcode_no.message}
          </p>
        )}
      </div>
    </>
  );
};

export default BarcodeNo;
