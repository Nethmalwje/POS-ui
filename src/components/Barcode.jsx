import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const Barcode = ({ errors, control, barcode }) => {
  return (
    <>
      <div>
        <label
          htmlFor="barcode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Barcode
        </label>
        <Controller
          name="barcode"
          defaultValue={barcode}
          control={control}
          rules={{
            required: "Barcode is required",
            pattern: {
              value: /^[a-zA-Z]+[a-zA-Z]*[0-9]{2,5}$/,
              message:
                "Barcode must start with one or more letters followed by at least two digits.",
            },
          }}
          render={({ field }) => (
            <Input {...field} id="barcode" placeholder="Enter Barcode" />
          )}
        />
        {errors.barcode && (
          <p className="text-red-500 text-xs mt-1">{errors.barcode.message}</p>
        )}
      </div>
    </>
  );
};

export default Barcode;
