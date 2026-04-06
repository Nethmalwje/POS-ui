import { DeleteOutlined } from "@ant-design/icons";
import { Button, Pagination, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const columns = [
  { title: "Barcode", dataIndex: "barcode", width: "25%" },
  { title: "Product Name", dataIndex: "productName", width: "25%" },
  { title: "Batch Number", dataIndex: "batchNo", width: "25%" },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "10%",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Expiry Date",
    dataIndex: "exp",
    width: "35%",
    sorter: (a, b) => a.age - b.age,
  },
  // { title: "Delete", dataIndex: "delete", width: "25%" },
  {
    title: "Delete",
    key: "delete",
    width: "25%",
    render: (item) => (
      <Popconfirm
        title="Are you sure to delete this item?"
        // onConfirm={() => handleTableDelete(item.stock_id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="link" danger>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    ),
  },
];

const newStocks = [
  {
    stock_id: "S001",
    barcode: "1234567890123",
    batchNo: "BATCH001",
    quantity: 50,
    exp: "2024-10-01",
    productName: "Organic Whole Milk",
  },
  {
    stock_id: "S002",
    barcode: "9876543210987",
    batchNo: "BATCH002",
    quantity: 20,
    exp: "2024-10-02",
    productName: "Free-Range Eggs",
  },
  {
    stock_id: "S003",
    barcode: "4567890123456",
    batchNo: "BATCH003",
    quantity: 15,
    exp: "2024-09-30",
    productName: "Artisan Bread",
  },
  {
    stock_id: "S004",
    barcode: "3210987654321",
    batchNo: "BATCH004",
    quantity: 30,
    exp: "2024-10-01",
    productName: "Aged Cheddar Cheese",
  },
  {
    stock_id: "S005",
    barcode: "9892753210987",
    batchNo: "BATCH002",
    quantity: 20,
    exp: "2024-10-02",
    productName: "Free-Range Eggs",
  },
  {
    stock_id: "S006",
    barcode: "4567891948356",
    batchNo: "BATCH003",
    quantity: 15,
    exp: "2024-09-30",
    productName: "Artisan Bread",
  },
  {
    stock_id: "S007",
    barcode: "3210927364321",
    batchNo: "BATCH004",
    quantity: 30,
    exp: "2024-10-01",
    productName: "Cheddar Cheese",
  },
  {
    stock_id: "S005",
    barcode: "6543210987654",
    batchNo: "BATCH005",
    quantity: 10,
    exp: "2024-09-29",
    productName: "Salted Butter",
  },
  {
    stock_id: "S006",
    barcode: "7890123456789",
    batchNo: "BATCH006",
    quantity: 5,
    exp: "2024-09-28",
    productName: "Greek Yogurt",
  },
  {
    stock_id: "S007",
    barcode: "2109876543210",
    batchNo: "BATCH007",
    quantity: 100,
    exp: "2024-08-15",
    productName: "Fresh Orange Juice",
  },
  {
    stock_id: "S008",
    barcode: "1357924680135",
    batchNo: "BATCH008",
    quantity: 25,
    exp: "2024-09-15",
    productName: "Whole Wheat Pasta",
  },
  {
    stock_id: "S009",
    barcode: "7881453456789",
    batchNo: "BATCH006",
    quantity: 5,
    exp: "2024-09-28",
    productName: "Greek Yogurt",
  },
  {
    stock_id: "S010",
    barcode: "2109826243210",
    batchNo: "BATCH007",
    quantity: 100,
    exp: "2024-08-15",
    productName: "Fresh Orange Juice",
  },
];

const NewlyAddedStocks = () => {
  const pageSize = 5;
  const newStocksCount = newStocks.length;
  const [newStocksCurrentPage, setNewStocksCurrentPage] = useState(1);
  const [newStocksLoading, setNewStocksLoading] = useState(false);

  const handleCurrentPage = (pageNumber) => {
    setNewStocksCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className=" pt-5">
        <h2 className="text-lg font-poppins font-semibold">
          New Stocks Overview
        </h2>
      </div>
      <div className=" lg:flex gap-5 pt-5">
        <div className=" mb-5 w-full border border-lime-400 bg-lime-100 rounded-lg overflow-hidden">
          <Table
            bordered
            pagination={false}
            size="small"
            title={() => (
              <Title level={4} style={{ color: "" }} className=" text-center">
                {/*set an appropriate Color*/}
                Newly Added Stocks
              </Title>
            )}
            loading={newStocksLoading}
            columns={columns}
            dataSource={newStocks}
            // style={{ width: "100%" }}
          />
          <Pagination
            className=" py-5 justify-center"
            defaultCurrent={1}
            current={newStocksCurrentPage}
            pageSize={pageSize}
            total={newStocksCount}
            onChange={(page) => handleCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewlyAddedStocks;
