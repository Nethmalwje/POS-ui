import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
import "./../SalesTable.css"; // Add custom CSS here
import axiosInstance from "../api/axiosConfig";
import BillDetails from "./BillDetails";
import HourGlass from "./HourGlass";

const SalesTable = ({ startDate, endDate, storeId }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);

      try {
        const billsResponse = await axiosInstance.get(
          `http://localhost:49164/sales-transactions?startDate=${startDate}&endDate=${endDate}&storeId=${storeId}`
        );

        setBills(billsResponse.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, [startDate, endDate, storeId]);

  const handleRowExpand = (expanded, record) => {
    // If expanded is true, add the row ID to the expanded rows, otherwise remove it
    setExpandedRows((prevState) =>
      expanded
        ? [...prevState, record.bill_id]
        : prevState.filter((id) => id !== record.bill_id)
    );
  };

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "bill_id",
      key: "bill_id",
      sorter: (a, b) => a.bill_id - b.bill_id,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => <span style={{ whiteSpace: "nowrap" }}>{date}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
    },
    {
      title: "Cashier Name",
      dataIndex: "cashier",
      key: "cashier",
      sorter: (a, b) => a.cashier.localeCompare(b.cashier),
    },
    {
      title: "Store Name",
      dataIndex: "store",
      key: "store",
      sorter: (a, b) => a.store.localeCompare(b.store),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => amount.toFixed(2),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (payment_method) => (
        <Tag color={payment_method === "Cash" ? "green" : "orange"}>
          {typeof payment_method === "string"
            ? payment_method.toUpperCase()
            : ""}
        </Tag>
      ),
    },
  ];

  if (loading) {
    return <HourGlass />;
  }

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={bills.map((item) => ({
          ...item,
          key: item.bill_id,
        }))}
        rowKey="bill_id"
        pagination={{
          pageSize: 9,
          position: ["bottomRight"],
        }}
        expandable={{
          expandedRowRender: (record) => (
            <BillDetails items={record.items} amount={record.amount} />
          ),
          rowExpandable: (record) => true,
          expandedRowKeys: expandedRows,
          onExpand: handleRowExpand,
        }}
        className="custom-table"
      />
    </div>
  );
};

export default SalesTable;
