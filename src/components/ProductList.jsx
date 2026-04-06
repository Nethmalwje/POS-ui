import React, { useEffect, useState } from "react";
import HourGlass from "./HourGlass.jsx";
import { Space, Table } from "antd";
import axiosInstance from "../api/axiosConfig.js";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const { Column } = Table;

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsResponse = await axiosInstance.get(
          "http://localhost:49160/products"
        );
        setProducts(productsResponse.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product_id) => {
    const oldProducts = [...products];
    const updatedProducts = oldProducts.filter(
      (product) => product.product_id !== product_id
    );
    setProducts(updatedProducts);

    try {
      // Use toast.promise to handle the loading, success, and error states
      const deleteResponse = await toast.promise(
        axiosInstance.delete(`http://localhost:49160/products/${product_id}`),
        {
          loading: "Deleting...",
          success: "Successfully deleted!",
          error: "Couldn't delete",
        }
      );

      console.log(deleteResponse.data);
    } catch (error) {
      console.log(error);

      // Revert to the old product list if the delete fails
      setProducts(oldProducts);
    }
  };

  if (loading) {
    return <HourGlass />;
  }

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error.message}</h2>
      </div>
    );
  }

  const filterName = searchParams.get("name");
  const filteredProducts = filterName
    ? products.filter((product) =>
        product?.product_name?.toLowerCase().includes(filterName.toLowerCase())
      )
    : products;

  return (
    <div>
      <Table
        dataSource={filteredProducts}
        rowKey={(product) => product?.product_id}
      >
        <Column
          title="Product Name"
          dataIndex="product_name"
          key="product_name"
        />
        <Column title="Unit Weight" dataIndex="unit_weight" key="unit_weight" />
        <Column
          title="Remove Product"
          key="action"
          render={(product) => (
            <Space
              size="middle"
              onClick={() => handleDelete(product?.product_id)}
              className="bg-red-400 py-2 px-4 hover:bg-red-600 cursor-pointer rounded-xl hover:text-white"
            >
              <a className="hover:text-white font-semibold">Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ProductList;
