import React, { useState } from "react";
import { Button, Modal } from "antd";
const RestoreModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Restore Bill
      </Button>
      <Modal
        title="Are you sure?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to restore the bill?</p>
      </Modal>
    </>
  );
};
export default RestoreModel;
