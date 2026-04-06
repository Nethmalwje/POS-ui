import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { Controller } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";
const { Option } = Select;

const Item = ({ errors, control, item }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsResponse = await axiosInstance.get(
          "http://localhost:49160/items"
        );
        setItems(itemsResponse.data);
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
          htmlFor="item"
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
              placeholder="Select Product"
            >
              {items.map((a_item) => (
                <Option key={a_item?.item_id} value={a_item?.item_id}>
                  {a_item?.product?.product_name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.item && (
          <p className="text-red-500 text-xs mt-1">{errors.item.message}</p>
        )}
      </div>
    </>
  );
};

export default Item;
