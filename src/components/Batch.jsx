import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const Batch = ({ errors, control, batch_no }) => {
  return (
    <>
      <div>
        <label
          htmlFor="batch_no"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Batch Number
        </label>
        <Controller
          name="batch_no"
          defaultValue={batch_no}
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Batch number can only contain numbers.",
            },
          }}
          render={({ field }) => (
            <Input {...field} id="batch_no" placeholder="Enter Batch Number" />
          )}
        />
        {errors.batch_no && (
          <p className="text-red-500 text-xs mt-1">{errors.batch_no.message}</p>
        )}
      </div>
    </>
  );
};

export default Batch;
