import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const UnitWeight = ({ errors, control, unit_weight }) => {
  return (
    <>
      {" "}
      <div>
        <label
          htmlFor="unit_weight"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Unit Weight
        </label>
        <Controller
          name="unit_weight"
          defaultValue={unit_weight}
          control={control}
          rules={{
            required: "Unit Weight is required",

            pattern: {
              value: /^[1-9]\d{0,2}(?:lbs|kg|g|oz)$/,
              message:
                "Unit Weight must be a number (1-999) followed by a valid unit (lbs, kg, g, oz)",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="unit_weight"
              placeholder="Enter Unit Weight"
            />
          )}
        />
        {errors.unit_weight && (
          <p className="text-red-500 text-xs mt-1">
            {errors.unit_weight.message}
          </p>
        )}
      </div>
    </>
  );
};

export default UnitWeight;
