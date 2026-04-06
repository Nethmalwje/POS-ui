import React, { useState } from "react";
import { Table, Button } from "antd";
import "./../SalesTable.css";
import { purchaseDetails } from "../helpers/list2";

function PurchaseTable() {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleDescription = (bill_id) => {
    setExpandedRows((prevState) =>
      prevState.includes(bill_id)
        ? prevState.filter((id) => id !== bill_id)
        : [...prevState, bill_id]
    );
  };

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "purchase_id",
      key: "purchase_id",
      sorter: (a, b) => a.purchase_id - b.purchase_id,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => <span style={{ whiteSpace: "nowrap" }}>{date}</span>,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
      key: "supplier_name",
      sorter: (a, b) => a.supplier_name.localeCompare(b.supplier_name),
    },
    {
      title: "Inventory Name",
      dataIndex: "inventory_name",
      key: "inventory_name",
      sorter: (a, b) => a.inventory_name.localeCompare(b.inventory_name),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button onClick={() => toggleDescription(record.purchase_id)}>
          {expandedRows.includes(record.purchase_id) ? "Hide" : "View More"}
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={purchaseDetails.map((item) => ({
          ...item,
          key: item.purchase_id,
        }))}
        rowKey="purchase_id"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              {record.description
                ? record.description
                : "No additional information about this sale."}
            </p>
          ),
          rowExpandable: (record) => true,
          expandedRowKeys: expandedRows,
        }}
        className="custom-table"
      />
    </div>
  );
}

export default PurchaseTable;
