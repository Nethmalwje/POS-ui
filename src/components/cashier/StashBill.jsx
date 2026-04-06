import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FileOutlined } from "@ant-design/icons";
const Stash = ({ func }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    func();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        style={{
          backgroundColor: "#00bcd4",
          borderColor: "#00bcd4",
          color: "#fff",
          width: "100px",
        }}
        icon={<FileOutlined />}
      >
        Hold
      </Button>
      <Modal
        title="Are you sure you want to Hold the bill?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="my-8">
          If you hold the bill the custermer should not be able to get the items
          they want to purchache until they pay for the items that are in the
          hold bill.and the hold bill data be cleared within everyday at 00.00AM
        </p>
      </Modal>
    </>
  );
};
export default Stash;
