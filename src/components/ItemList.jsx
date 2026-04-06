import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HourGlass from "./HourGlass.jsx";
import axiosInstance from "../api/axiosConfig.js";
import { Space, Table } from "antd";
import toast from "react-hot-toast";

const { Column } = Table;

const ItemList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const itemsResponse = await axiosInstance.get(
          "http://localhost:49160/items"
        );

        // Sorting items by product_name
        const sortedItems = itemsResponse.data.sort((a, b) => {
          const nameA = a.product.product_name.toLowerCase();
          const nameB = b.product.product_name.toLowerCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setItems(sortedItems);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (item_id) => {
    const oldItems = [...items];
    const updatedItems = oldItems.filter((item) => item.item_id !== item_id);
    setItems(updatedItems);

    try {
      // Use toast.promise to handle the loading, success, and error states
      const deleteResponse = await toast.promise(
        axiosInstance.delete(`http://localhost:49160/items/${item_id}`),
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
      setItems(oldItems);
    }
  };

  if (loading) {
    return <HourGlass />;
  }

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error}</h2>
      </div>
    );
  }

  const filterName = searchParams.get("name");
  const filteredItems = filterName
    ? items.filter((item) =>
        item.product.product_name
          .toLowerCase()
          .includes(filterName.toLowerCase())
      )
    : items;

  return (
    <Table dataSource={filteredItems} rowKey={(item) => item?.item_id}>
      <Column
        title="Product Name"
        render={(record) => record?.product?.product_name}
        key="product_name"
      />
      <Column title="Batch Number" dataIndex="batch_no" key="batch_no" />
      <Column
        title="Buying Price"
        dataIndex="buying_price"
        key="buying_price"
      />
      <Column
        title="Selling Price"
        dataIndex="selling_price"
        key="selling_price"
      />
      <Column title="MFD" dataIndex="mfd" key="mfd" />
      <Column title="EXP" dataIndex="exp" key="exp" />
      <Column
        title="Remove Item"
        key="action"
        render={(item) => (
          <Space
            size="middle"
            onClick={() => handleDelete(item?.item_id)}
            className="bg-red-400 py-2 px-4 hover:bg-red-600 cursor-pointer rounded-xl hover:text-white"
          >
            <a className="hover:text-white font-semibold">Delete</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default ItemList;
