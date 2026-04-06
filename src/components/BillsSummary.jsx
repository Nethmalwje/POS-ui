import React from "react";
import { Card, Table } from "antd";

const columns = [
  {
    title: "Bill ID",
    dataIndex: "bill_id",
    key: "bill_id",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Total Amount",
    dataIndex: "total",
    key: "total",
  },
];

const data = [
  {
    key: "1",
    bill_id: "00001",
    customer: "John Cena",
    total: "Rs. 150",
  },
  {
    key: "2",
    bill_id: "00002",
    customer: "Randy Orton",
    total: "Rs.200",
  },
  {
    key: "3",
    bill_id: "00003",
    customer: "Brock Lesnar",
    total: "Rs. 250",
  },
  {
    key: "4",
    bill_id: "00004",
    customer: "Roman Reigns",
    total: "Rs. 400",
  },
  {
    key: "5",
    bill_id: "00005",
    customer: "Dean Ambrose",
    total: "Rs. 1000",
  },
];

const BillsSummary = () => {
  return (
    <Card
      title={
        <span className="text-xl font-poppins text-gray-800">
          Bills Summary
        </span>
      }
      style={{
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 100%)",
        padding: "20px",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ background: "white", borderRadius: "10px" }}
      />
    </Card>
  );
};

export default BillsSummary;
