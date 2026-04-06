import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";
const { Option } = Select;

const Items = ({ errors, control, item }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsResponse = await axiosInstance.get(
          "http://localhost:49160/items"
          // "http://localhost:3010/sample"
        );
        setItems(itemsResponse.data);
        console.log(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div>
        <label
          htmlFor="item_id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Item
        </label>
        <Controller
          name="item_id"
          defaultValue={item}
          control={control}
          rules={{ required: "You must select an item." }}
          render={({ field }) => (
            <Select
              {...field}
              style={{
                width: "100%",
                borderColor: errors.item_id ? "red" : "green",
              }}
              placeholder="Item ID - Product Name"
            >
              {items.map((item) => (
                <Option key={item?.item_id} value={item?.item_id}>
                  {item?.item_id} - {item?.product.product_name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.item_id && (
          <p className="text-red-500 text-xs mt-1">{errors.item_id?.message}</p>
        )}
      </div>
    </>
  );
};

export default Items;
