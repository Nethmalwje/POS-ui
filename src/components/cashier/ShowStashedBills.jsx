import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Modal } from "antd";
import axiosInstance_sales from "../../api/axiosConfig_Sales";
import RestoreModel from "./RestoreModel";

const { Text } = Typography;

const ShowStashedBills = ({ onRestore }) => {
  const [bills, setBills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch bills data from the API
  const handleLoad = async () => {
    try {
      const response = await axiosInstance_sales.get("/getOrder");
      console.log("response from bill", response);
      setBills(response.data); // Adjust according to your API response structure
    } catch (error) {
      console.error("Error during data fetch from sales service:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // Filter only the bills with status "Pending"
  const pendingBills = bills.filter((bill) => bill.status === "Pending");

  const columns = [
    {
      title: "Bill ID",
      dataIndex: "bill_id",
      key: "bill_id",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => {
        // Ensure items is an object with a value property that is an array
        const itemArray = items?.value || [];
        return itemArray.length > 0 ? (
          <ul>
            {itemArray.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <Text>No items</Text>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "items",
      key: "totalAmount",
      render: (items) => {
        const itemArray = items?.value || [];
        const totalAmount = itemArray.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );
        return <Text>${totalAmount.toFixed(2)}</Text>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <RestoreModel />,
    },
  ];

  return (
    <div>
      <div className="font-bold text-3xl mb-10">Stashed Bills</div>
      <Table
        columns={columns}
        dataSource={pendingBills}
        pagination={{ pageSize: 10 }} // Set pageSize to 10
        bordered
        size="middle"
        rowKey="bill_id"
      />
    </div>
  );
};

export default ShowStashedBills;
