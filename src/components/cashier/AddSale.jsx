import { Button, Image, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { ScanOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { axiosInstance_inventory } from "../../api/axiosConfig_Inventory";
import axiosInstance_product from "../../api/axiosConfig_Product";

const AddSale = (props) => {
  const { t } = useTranslation(["cashier"]);
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch all products on component mount
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance_product.get("/items"); // Replace with your endpoint
        const productsData = response.data.map((item) => ({
          key: item.item_id,
          product_name: item.product.product_name,
          price: parseFloat(item.selling_price),
          // Add other properties as needed
        }));
        setProducts(productsData); // Set fetched products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once when the component mounts
  const handleSubmit = async () => {
    // Find the product that matches the barcode
    console.log("Products from add:", products);
    console.log("Barcode entered:", barcode);

    // Check if quantity is a valid number
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity."); // Popup alert for invalid quantity
      return; // Exit the function early if quantity is invalid
    }

    const matchedProduct = products.find(
      (product) => product.key.toString() === barcode
    );

    if (matchedProduct) {
      const newEntry = {
        product_name: matchedProduct.product_name,
        quantity: parseInt(quantity, 10), // Ensure quantity is stored as a number
        address: "Sample Address", // Replace with actual data if needed
        key: matchedProduct.key,
        //key: Date.now().toString(), // Unique key for each entry
        price: matchedProduct.price, // Assuming price is available
      };

      // Update parent state with new entry
      props.setVariable((prevData) => [...prevData, newEntry]);

      // Clear input fields after submission
      setBarcode("");
      setQuantity("");
    } else {
      alert("No matching barcode found."); // Popup alert for no results
    }
  };

  // const newEntry = {
  //   name: barcode,
  //   quantity: quantity,
  //   address: "Sample Address", // Sample address or replace it with actual data
  //   key: Date.now().toString(), // Unique key for each entry
  // };

  // // Pass an array of data objects to `props.setVariable`
  // props.setVariable((prevData) => [...prevData, newEntry]);

  // // Clear input fields after submission
  // setBarcode("");
  // setQuantity("");

  return (
    <div>
      <div>
        <div className="xl:flex block xl:justify-between ">
          <Space>
            <Space.Compact size="medium">
              <Input
                placeholder={t("add_sale.enter_barcode")}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Input
                placeholder={t("add_sale.enter_quantity")}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button type="primary" onClick={handleSubmit}>
                {t("add_sale.submit")}
              </Button>
            </Space.Compact>
          </Space>
          <div className="flex xl:justify-end pt-4 xl:pt-0 ">
            <Button type="primary" onClick={showModal}>
              <ScanOutlined />
              {t("add_sale.scan_barcode")}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        className="flex justify-center p-12"
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            className="mx-auto bg-red-500 text-white"
          >
            {t("add_sale.cancel")}
          </Button>,
          <Button
            key="done"
            onClick={handleOk}
            className="mx-auto bg-green-500 text-white"
          >
            {t("add_sale.done")}
          </Button>,
        ]}
      >
        <div className="flex justify-center px-24 text-lg font-semibold">
          <h2 className="text-xl font-semibold">
            {t("add_sale.scan_barcode_modal_title")}
          </h2>
        </div>
        <div className="flex justify-center">
          <img
            src={"/barcode-read.gif"} // Ensure this is the correct path to your image
            alt="Rotating Graph"
            width="200px"
            className="flex justify-center"
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddSale;
