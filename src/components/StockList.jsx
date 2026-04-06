import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Pagination,
  Modal,
  Input,
  Divider,
  message,
  InputNumber,
} from "antd";
import {
  BarcodeOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  DownOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";
import RefreshButton from "./RefreshButton";
import Search from "antd/es/input/Search";
import { useUserData } from "../context/userContext";
import BarcodeModal from "./BarcodeModal";
import StockTransferModal from "./StockTransferModal";

const { Column } = Table;

// const handleMenuClick = (e) => {
//   message.info("Click on menu item.");
//   console.log("click", e);
// };

const StockList = () => {
  // const [location, setLocation] = useState(1);
  const [region, setRegion] = useState({});
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState();
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStocks, setTotalStocks] = useState();
  const [error, setError] = useState(null);
  const [searchNameText, setSearchNameText] = useState("");
  const [searchBarcodeText, setSearchBarcodeText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);
  const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
  const [transferStock, setTransferStock] = useState(null);
  // const [selectedLocation, setSelectedLocation] = useState(null);

  const { fullUser: user } = useUserData();
  console.log("user: ", user);

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

  const fetchStocks = async () => {
    const data = {
      role: user?.role,
      location_id: user.location?.location_id,
      page_size: pageSize,
      current_page: currentPage,
      product_name: searchNameText,
      barcode: searchBarcodeText,
    };
    try {
      setLoading(true);
      console.log(data);

      const stocksResponse = await axiosInstance_inventory.post(
        "/stocks",
        data
      );

      setStocks(stocksResponse.data.stocks);
      setTotalStocks(stocksResponse.data.stockCount);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRegion();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchStocks();
  }, [currentPage, isSearching]);

  const handleDelete = async (stock_id, quantity) => {
    const data = { stockId: stock_id, qty: quantity };

    try {
      await axiosInstance_inventory.put("/removeStock", data);

      const prevStocks = [...stocks];
      const updatedStocks = prevStocks.filter(
        (stock) => stock.stock_id !== stock_id
      );
      setStocks(updatedStocks);
    } catch (error) {
      setError(error);
    }
  };

  const handleRefresh = () => {
    setCurrentPage(currentPage);
    setLoading(true);
    fetchStocks();
  };

  const handleCurrentPage = async (page) => {
    setCurrentPage(page);
  };

  const onNameSearch = (value) => {
    setCurrentPage(1);
    fetchStocks();
  };
  const onBarcodeSearch = (value) => {
    setCurrentPage(1);
    fetchStocks();
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

  const showTransferModal = (stock) => {
    setTransferStock(stock);
    setIsTransferModalVisible(true);
  };

  const handleTransferModalOk = async ({ stockId, src, dest, qty }) => {
    const data = { stockId: stockId, qty: qty, src: src, dest: dest };

    try {
      await axiosInstance_inventory.post("/sendStock", data);
    } catch (error) {
      setError(error);
    }
    setIsTransferModalVisible(false);
  };

  const handleTransferModalCancel = () => {
    setIsTransferModalVisible(false);
  };

  const handleTransferTo = (e) => {};

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error.message}</h2>
      </div>
    );
  }

  return (
    <div className=" rounded-lg overflow-hidden">
      <div className=" mb-5">
        <div className=" pt-5 flex justify-between">
          <div>
            <h2 className="text-lg font-poppins font-semibold">
              Available Stocks
            </h2>
            <h2 className="text-md text-gray-500 font-poppins ">
              All Regions
              {user.role === "General Manager"
                ? null
                : ` / ${region?.name} Region`}
              {user.role === "Regional Manager"
                ? null
                : ` / ${user.location?.name}`}
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
        <div className=" pt-5">
          <BarcodeModal
            isVisible={isBarcodeModalVisible}
            onOk={handleBarcodeModalOk}
            onCancel={handleBarcodeModalCancel}
          />
          <StockTransferModal
            transferStock={transferStock}
            isVisible={isTransferModalVisible}
            onOk={handleTransferModalOk}
            onCancel={handleTransferModalCancel}
          />
        </div>

        <Table
          pagination={false}
          bordered
          size="middle"
          pageSize={pageSize}
          dataSource={stocks}
          rowKey={(stock) => stock?.stock_id}
          loading={loading}
        >
          <Column title="Barcode" dataIndex="barcode" key="barcode" />
          <Column
            title="Product Name"
            dataIndex="product_name"
            key="product_name"
          />
          <Column title="Batch No." dataIndex="batch_no" key="batch_no" />
          <Column
            title="Quantity"
            width={"15%"}
            dataIndex="quantity"
            key="quantity"
          />
          <Column title="Expiry Date" dataIndex="exp" key="exp" />
          {/* <Column title="Region" dataIndex="region" key="region" /> */}
          <Column title="Location" dataIndex="location" key="location" />
          <Column
            title="Transfer Stock"
            key="action"
            width={"10%"}
            render={(stock) => (
              <Button
                type="link"
                onClick={(e) => {
                  // e.preventDefault();
                  showTransferModal(stock);
                }}
              >
                <SwapOutlined />
              </Button>
            )}
          />
          <Column
            title="Remove Stock"
            key="action"
            width={"10%"}
            render={(stock) => (
              <Popconfirm
                title="Are you sure to delete this stock?"
                onConfirm={() => handleDelete(stock.stock_id, stock.quantity)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
          />
        </Table>
        <Pagination
          className=" py-5 justify-center"
          defaultCurrent={1}
          current={currentPage}
          pageSize={pageSize}
          total={totalStocks}
          onChange={(page) => handleCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default StockList;
