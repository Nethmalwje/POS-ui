import { Divider, Input, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const BarcodeModal = ({ isVisible, onOk, onCancel }) => {
  const [barcode, setBarcode] = useState("");

  const handleOk = () => {
    if (!barcode) {
      toast.error("Please Enter the Barcode");
      return;
    }
    setBarcode("");
    onOk(barcode);
  };

  const handleCancel = () => {
    setBarcode("");
    onCancel();
  };

  return (
    <Modal // barcode Modal
      centered
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className=" font-semibold text-lg mb-5">Scan Barcode</p>
      <Input
        className=" mb-5"
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Scan or Enter barcode here"
        value={barcode}
      />
    </Modal>
  );
};
export default BarcodeModal;
