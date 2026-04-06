//this function is  useless,remove

import React, { useState } from "react";
import { Button, Modal, Card, Row, Col } from "antd";

const HoldPopUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Selected payment method:", selectedMethod);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Checkout
      </Button>
      <Modal
        title="Please select your payment method"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="pt-10">
          <Row gutter={40} justify="center">
            <Col>
              <h1>are you sure you want to hold the bill</h1>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default HoldPopUp;
