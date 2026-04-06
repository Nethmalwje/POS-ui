import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { formatDate } from "../helpers/formatDate";
import "./../CustomersTable.css";
import { PORT } from "../helpers/port";

const CustomersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/api/v1/customers/`, {
        withCredentials: true,
      })
      .then((response) => {
        // Map through the data to add derived fields and format the date
        const formattedData = response.data.data.customers.map((item) => ({
          ...item,
          loyaltyStatus: item.loyaltyPoints > 0 ? "Yes" : "No",
          registered_date: formatDate(item.registered_date),
        }));

        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
    },
    {
      title: "Registered Date",
      dataIndex: "registered_date",
      key: "registered_date",
      sorter: (a, b) =>
        new Date(a.registered_date) - new Date(b.registered_date),
    },
    {
      title: "Loyalty Status",
      dataIndex: "loyaltyStatus",
      key: "loyaltyStatus",
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      onFilter: (value, record) => record.loyaltyStatus === value,
    },
    {
      title: "Loyalty Points",
      dataIndex: "loyalty_points",
      key: "loyalty_points",
      sorter: (a, b) => a.loyalty_points - b.loyalty_points,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowKey="id"
      className="custom-table m-4" // Add the custom class
    />
  );
};

export default CustomersTable;
