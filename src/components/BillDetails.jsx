import { Table } from "antd";
import React from "react";
import "../BillTable.css";

const BillDetails = ({ items, amount }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toFixed(2),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Per Product Total",
      render: (_, record) => {
        const total = record.price * record.quantity;
        return total.toFixed(2); // Ensure you format it as a number with two decimal places
      },
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={items.map((item) => ({
          ...item,
          key: item.product_name,
        }))}
        rowKey="product_name"
        pagination={false}
        className="inner-table"
        summary={() => (
          <Table.Summary.Row className="bg-blue-50">
            <Table.Summary.Cell index={0} colSpan={3}>
              <p className="font-semibold">Total</p>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <p className="font-semibold">{amount.toFixed(2)}</p>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
};

export default BillDetails;
