import React from "react";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";

const { RangePicker } = DatePicker;

const MfdExp = ({ errors, control, mfdExp }) => {
  return (
    <>
      <div>
        <label
          htmlFor="mfdExp"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Manufactured and Expiry Date
        </label>
        <Controller
          name="mfdExp"
          defaultValue={mfdExp}
          control={control}
          rules={{
            required: "Manufactured Date is required",
          }}
          render={({ field }) => (
            <RangePicker
              className="w-2/5"
              {...field}
              id="mfdExp"
              placeholder={["Manufactured Date", "Expiry Date"]}
            />
          )}
        />
        {errors.mfdExp && (
          <p className="text-red-500 text-xs mt-1">{errors.mfdExp.message}</p>
        )}
      </div>
    </>
  );
};

export default MfdExp;
