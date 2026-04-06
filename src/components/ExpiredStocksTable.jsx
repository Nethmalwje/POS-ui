import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "antd";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";
import { BarcodeOutlined, CloseSquareOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import RefreshButton from "./RefreshButton";
import { useUserData } from "../context/userContext";
import axiosInstance from "../api/axiosConfig";

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

const ExpiredStocksTable = () => {
  const pageSize = 10;
  const [region, setRegion] = useState({});
  const [location, setLocation] = useState(1);
  const [expiredStocks, setExpiredStocks] = useState();
  const [stockCount, setStockCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchNameText, setSearchNameText] = useState("");
  const [searchBarcodeText, setSearchBarcodeText] = useState("");
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);

  const { fullUser: user } = useUserData();

  const fetchRegion = async () => {
    const data = { location_id: user?.location?.location_id };
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

  const fetchExpired = async () => {
    setLoading(true);
    const data = {
      type: "expired",
      role: user?.role,
      location_id: location,
      page_size: pageSize,
      current_page: currentPage,
    };

    try {
      const expiredResponse = await axiosInstance_inventory.post(
        "/expires",
        data
      );
      setExpiredStocks(expiredResponse.data.stocks);
      setStockCount(expiredResponse.data.expiringCount);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch expiring stocks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegion();
    fetchExpired();
  }, []);

  useEffect(() => {
    console.log(currentPage);
    fetchExpired();
  }, [currentPage]);

  const handleRefresh = () => {
    setLoading(true);
    fetchExpired();
  };

  const handleCurrentPage = async (page) => {
    setCurrentPage(page);
  };

  const onNameSearch = (value) => {
    setCurrentPage(1);
    fetchExpired();
  };
  const onBarcodeSearch = (value) => {
    setCurrentPage(1);
    fetchExpired();
  };

  const handleClearFilters = () => {
    setSearchNameText("");
    setSearchBarcodeText("");
    handleCurrentPage(1);
    handleRefresh();
  };

  const handleBarcodeModalOk = (barcode) => {
    setSearchBarcodeText(barcode);
    setIsBarcodeModalVisible(false);
    onBarcodeSearch();
  };
  const handleBarcodeModalCancel = () => {
    setIsBarcodeModalVisible(false);
  };

  return (
    // <div className="mb-5 border border-danger-400 bg-danger-100 rounded-lg overflow-hidden">
    <div className=" rounded-lg overflow-hidden">
      <div className=" mb-5">
        <div className=" pt-5 flex justify-between">
          <div>
            <h2 className="text-lg font-poppins font-semibold">
              Expired Stocks
            </h2>
            <h2 className="text-md text-gray-500 font-poppins ">
              All Regions
              {user.role === "General Manager"
                ? null
                : ` / ${region?.name} Region`}
              {user.role === "Regional Manager"
                ? null
                : ` / ${user?.location?.name}`}
            </h2>
          </div>
          <RefreshButton onRefresh={handleRefresh} />
        </div>
        <div className="pt-5 flex gap-5">
          <Search
            placeholder="Search by Product Name"
            value={searchNameText}
            onChange={(e) => {
              setSearchNameText(e.target.value);
            }}
            onSearch={onNameSearch}
          />
          <Search
            placeholder="Search by Barcode"
            value={searchBarcodeText}
            onChange={(e) => {
              setSearchBarcodeText(e.target.value);
            }}
            onSearch={onBarcodeSearch}
          />
          <Button
            className=" w-1/6"
            onClick={() => {
              setIsBarcodeModalVisible(true);
            }}
          >
            <BarcodeOutlined />
            {" Scan Barcode"}
          </Button>
          <Button
            color="default"
            className=" w-1/6"
            onClick={() => {
              handleClearFilters();
            }}
          >
            <CloseSquareOutlined />
            {" Clear Filters"}
          </Button>
        </div>
      </div>
      <Table
        bordered
        pagination={false}
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={expiredStocks}
      />
      <Pagination
        className="py-5 justify-center"
        current={currentPage}
        pageSize={pageSize}
        total={stockCount}
        onChange={(page) => handleCurrentPage(page)}
      />
    </div>
  );
};

export default ExpiredStocksTable;
