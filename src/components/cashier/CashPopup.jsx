import React, { useState } from "react";
import { Button, Modal, Card, Row, Col } from "antd";

const CashPopUp = () => {
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
        Cash
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
              <Card
                hoverable
                style={{
                  width: 100,
                  border: selectedMethod === "cash" ? "2px solid #1890ff" : "",
                  textAlign: "center", // Center content inside the card
                }}
                onClick={() => handleSelect("cash")}
              >
                <img
                  alt="Cash"
                  src="/cash-flow.png"
                  style={{ width: 60, paddingBottom: 10 }}
                />
                <Card.Meta title="Cash" />
              </Card>
            </Col>
            <Col>
              <Card
                hoverable
                style={{
                  width: 100,
                  border: selectedMethod === "card" ? "2px solid #1890ff" : "",
                  textAlign: "center", // Center content inside the card
                }}
                onClick={() => handleSelect("card")}
              >
                <img
                  alt="Card"
                  src="/credit-card.png"
                  style={{ width: 60, paddingBottom: 10 }}
                />
                <Card.Meta title="Card" />
              </Card>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default CashPopUp;
