import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Password({ text, error, ...field }) {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={text.toLowerCase().replace(/ /g, "")}
        className="block text-sm font-medium ml-1 text-gray-700 mb-1"
      >
        {text}
      </label>
      <Input.Password
        id={text.toLowerCase().replace(/ /g, "")}
        placeholder={text}
        {...field}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className={`rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
}

export default Password;
