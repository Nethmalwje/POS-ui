import React, { useEffect, useState } from "react";
import { Table, Pagination, Typography, Button } from "antd";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";
import { BarcodeOutlined, CloseSquareOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import RefreshButton from "./RefreshButton";
import Column from "antd/es/table/Column";
import { useUserData } from "../context/userContext";

const { Title } = Typography;

const columns = [
  { title: "Barcode", dataIndex: "barcode", width: "25%" },
  { title: "Product Name", dataIndex: "product_name", width: "25%" },
  { title: "Batch Number", dataIndex: "batch_no", width: "15%" },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "10%",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Expiry Date",
    dataIndex: "exp",
    width: "25%",
    sorter: (a, b) => a.age - b.age,
  },
];

const expiringSoonStocks = [
  {
    stock_id: 1,
    barcode: "198457901",
    product_name: "Fresh Milk 1L",
    batch_no: 10,
    quantity: 15,
    exp: "2024-10-10",
  },
  {
    stock_id: 2,
    barcode: "198457902",
    product_name: "Greek Yogurt 200g",
    batch_no: 11,
    quantity: 20,
    exp: "2024-10-12",
  },
  {
    stock_id: 3,
    barcode: "198457903",
    product_name: "Whole Wheat Bread",
    batch_no: 12,
    quantity: 30,
    exp: "2024-10-15",
  },
  {
    stock_id: 4,
    barcode: "198457904",
    product_name: "Organic Spinach 250g",
    batch_no: 13,
    quantity: 25,
    exp: "2024-10-18",
  },
  {
    stock_id: 5,
    barcode: "198457905",
    product_name: "Chicken Thighs 500g",
    batch_no: 14,
    quantity: 10,
    exp: "2024-10-20",
  },
  {
    stock_id: 6,
    barcode: "198457906",
    product_name: "Eggs 12-pack",
    batch_no: 15,
    quantity: 18,
    exp: "2024-10-22",
  },
  {
    stock_id: 7,
    barcode: "198457907",
    product_name: "Sliced Cheese 200g",
    batch_no: 16,
    quantity: 22,
    exp: "2024-10-25",
  },
  {
    stock_id: 8,
    barcode: "198457908",
    product_name: "Bananas 1kg",
    batch_no: 17,
    quantity: 30,
    exp: "2024-10-28",
  },
  {
    stock_id: 9,
    barcode: "198457909",
    product_name: "Frozen Peas 500g",
    batch_no: 18,
    quantity: 15,
    exp: "2024-10-30",
  },
  {
    stock_id: 10,
    barcode: "198457910",
    product_name: "Pasta 500g",
    batch_no: 19,
    quantity: 40,
    exp: "2024-11-01",
  },
  {
    stock_id: 11,
    barcode: "198457911",
    product_name: "Tomato Sauce 400g",
    batch_no: 20,
    quantity: 35,
    exp: "2024-11-05",
  },
  {
    stock_id: 12,
    barcode: "198457912",
    product_name: "Granola Bars 6-pack",
    batch_no: 21,
    quantity: 20,
    exp: "2024-11-10",
  },
];

const ExpiringStocksTable = () => {
  const pageSize = 10;
  const [region, setRegion] = useState({});
  const [location, setLocation] = useState(1);
  const [expiringStocks, setExpiringStocks] = useState();
  const [totalStocks, setTotalStocks] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { fullUser: user } = useUserData();

  // { "type":"expired", "role":"Inventory Manager", "location_id":1, "page_size":10, "current_page":1 }

  const fetchRegion = async () => {
    const data = { location_id: user.location.location_id };
    try {
      setLoading(true);
      const regionResponse = await axiosInstance_inventory.post(
        "/region",
        data
      );
      setRegion(regionResponse.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpiring = async () => {
    setLoading(true);
    const data = {
      type: "expiring",
      role: user.role,
      location_id: location,
      page_size: pageSize,
      current_page: currentPage,
    };

    try {
      const expiringResponse = await axiosInstance_inventory.post(
        "/expires",
        data
      );
      // console.log(expiringResponse.data);

      setExpiringStocks(expiringResponse.data.stocks);
      setTotalStocks(expiringResponse.data.expiringCount);
      console.log(expiringResponse.data.stockCount);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch expiring stocks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchExpiring();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchExpiring();
  }, [currentPage]);

  const handleDelete = (stockId) => {
    console.log("Deleting stock ", stockId, " from expiring stocks");
    // Implement delete logic here
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchExpiring();
  };

  return (
    // <div className="mb-5 border border-amber-400 bg-amber-100 rounded-lg overflow-hidden">
    <div className=" rounded-lg overflow-hidden">
      <div className=" mb-5">
        <div className=" pt-5 flex justify-between">
          <div>
            <h2 className="text-lg font-poppins font-semibold">
              Expiring Stocks
            </h2>
            <h2 className="text-md text-gray-500 font-poppins ">
              All Regions
              {user.role === "General Manager"
                ? null
                : ` / ${region.name} Region`}
              {user.role === "Regional Manager"
                ? null
                : ` / ${user.location.name}`}
            </h2>
          </div>
          <RefreshButton onRefresh={handleRefresh} />
        </div>
        <div className="pt-5 flex gap-5">
          <Search
            placeholder="Search by Product Name"
            // value={searchNameText}
            onChange={(e) => {
              // setSearchNameText(e.target.value);
            }}
            // onSearch={onNameSearch}
          />
          <Search
            placeholder="Search by Barcode"
            // value={searchBarcodeText}
            onChange={(e) => {
              // setSearchBarcodeText(e.target.value);
            }}
            // onSearch={onBarcodeSearch}
          />
          <Button
            className=" w-1/6"
            onClick={() => {
              // setIsBarcodeModalVisible(true);
            }}
          >
            <BarcodeOutlined />
            {" Scan Barcode"}
          </Button>
          <Button
            color="default"
            className=" w-1/6"
            onClick={() => {
              // handleClearFilters();
            }}
          >
            <CloseSquareOutlined />
            {" Clear Filters"}
          </Button>
        </div>
      </div>
      <Table
        bordered
        size="middle"
        pagination={false}
        // pagination={{
        //   current: 1,
        //   pageSize: 10,
        //   showSizeChanger: false,
        //   position: ["bottomCenter"],
        //   style: { display: "flex", justifyContent: "center" },
        // }}
        // size="medium"
        loading={loading}
        // columns={columns}
        dataSource={expiringStocks}
      >
        <Column title="Barcode" dataIndex="barcode" width="25%" />
        <Column title="Product Name" dataIndex="product_name" width="25%" />
        <Column title="Batch Number" dataIndex="batch_no" width="15%" />
        <Column title="Quantity" dataIndex="quantity" width="10%" />
        <Column title="Expiry Date" dataIndex="exp" width="25%" />
      </Table>
      <Pagination
        className="py-5 justify-center"
        total={totalStocks}
        current={currentPage}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ExpiringStocksTable;
