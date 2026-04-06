import React, { useState } from "react";
import { Card, Modal } from "antd";

const gridStyle = {
  width: "23%",
  margin: "1%",
  padding: "2% 0",
  textAlign: "center",
};

const StockModal = ({ type, element }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(type);
  const [inputValue, setInputValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <Card.Grid onC style={gridStyle} onClick={showModal}>
        {element.value}
      </Card.Grid>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter stock value"
        />
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default StockModal;
