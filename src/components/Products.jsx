import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";
const { Option } = Select;

const Products = ({ errors, control, product }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axiosInstance.get(
          "http://localhost:49160/products"
        );
        setProducts(productsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <label
          htmlFor="product_id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product
        </label>
        <Controller
          name="product_id"
          defaultValue={product}
          control={control}
          rules={{ required: "You must select a product." }}
          render={({ field }) => (
            <Select
              {...field}
              style={{
                width: "100%",
                borderColor: errors.product_id ? "red" : "green",
              }}
              placeholder="Select Product"
            >
              {products.map((a_product) => (
                <Option
                  key={a_product?.product_id}
                  value={a_product?.product_id}
                >
                  {a_product?.product_name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.product_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.product_id?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Products;
