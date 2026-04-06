import React, { useEffect, useState } from "react";
import { Card, Input, Button, Row, Col, Space, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axiosInstance_product from "../../api/axiosConfig_Product";
import { useTranslation } from "react-i18next";
import { imageUrls } from "./imageUrl";

const SearchItem = (props) => {
  const { t } = useTranslation(["cashier"]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(18); // Default page size

  // const imageUrls = [
  // "/items/26.png", // Replace with your actual image URLs
  // "/items/27.png",
  // "/items/28.png",
  // "/items/29.png",
  // "/items/30.png",
  // "/items/31.png", // Replace with your actual image URLs

  // "/items/34.png",
  // "/items/35.png",
  // "/items/36.png",
  // "/items/37.png",
  // "/items/38.png",
  // ];

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.product_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  //delete this fuction after backend integration
  function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1)); // Generates a number between 0 and max (inclusive)
  }

  const handleLoad = async () => {
    try {
      const response = await axiosInstance_product.get("/items");
      const productsData = response.data.map((item) => ({
        key: item.item_id,
        product_name: item.product.product_name,
        price: parseFloat(item.selling_price),
        quantity: 1, // Default quantity
        imageUrl: imageUrls[item.item_id],
        // imageUrl: imageUrls[getRandomNumber(10)], // Default placeholder
        // imageUrl: "/shoe.png", // Default placeholder
      }));
      console.log(productsData);
      setProducts(productsData);
      setFilteredData(productsData);
    } catch (error) {
      console.error("Error during data fetch from product service:", error);
    }
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredData(products);
    setCurrentPage(1); // Reset to first page on reset
  };

  const handleQuantityChange = (value, key) => {
    const updatedData = filteredData.map((item) => {
      if (item.key === key) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setFilteredData(updatedData);
  };

  const handleSubmit = (item) => {
    const newEntry = {
      ...item,
      quantity: item.quantity || 1, // Default to 1 if no quantity specified
    };

    props.setVariable((prevData) => [...prevData, newEntry]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // Calculate current page data
  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Search bar section */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={t("search_items.searchPlaceholder")}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
          {t("search_items.searchButton")}
        </Button>
        <Button onClick={handleReset}>{t("search_items.resetButton")}</Button>
      </Space>

      {/* Responsive grid layout */}
      <Row gutter={[16, 16]}>
        {currentData.map((item) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4} key={item.key}>
            <Card
              hoverable
              className="shadow-lg rounded-md"
              cover={
                <img
                  alt={item.product_name}
                  src={item.imageUrl}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              bodyStyle={{ padding: "20px" }} // Set padding to 0
            >
              <div className="p-2">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {item.product_name}
                </h3>
                <p className="text-blue-500 text-xl font-bold">${item.price}</p>
              </div>
              <div className="flex justify-between p-2">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value, 10), item.key)
                  }
                  style={{ width: 60 }}
                />
                <Button
                  onClick={() => handleSubmit(item)}
                  type="primary"
                  icon={<PlusOutlined />}
                  className="w-full mt-2 rounded-xl"
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Component */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};

export default SearchItem;
