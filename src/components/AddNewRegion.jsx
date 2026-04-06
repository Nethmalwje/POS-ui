import { Divider, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

const AddNewRegion = ({ visible, onOk, onCancel, regions }) => {
  const [newRegionName, setNewRegionName] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  useEffect(() => {
    // Check if the region name already exists whenever newRegionName changes
    const exists = regions.some(
      (region) => region.name.toLowerCase() === newRegionName.toLowerCase()
    );
    setInputStatus(exists ? "error" : "");
  }, [newRegionName, regions]);

  const handleOk = () => {
    // Final check before submitting
    if (inputStatus === "error") {
      message.error(
        "Region name already exists. Please choose a different name."
      );
    } else {
      onOk(newRegionName); // Pass the new region name to the parent
      setNewRegionName(""); // Reset the input field
      setInputStatus(""); // Reset the input status
    }
  };

  return (
    <div>
      <Modal open={visible} onOk={onOk} onCancel={onCancel}>
        <p className=" font-semibold text-lg">Add New Region</p>
        <Divider />
        <div className=" pb-2 flex justify-between">
          <p>Region Name: </p>
          <Input
            value={newRegionName}
            onChange={(e) => {
              setNewRegionName(e.target.value);
            }}
            status={inputStatus}
            className=" w-2/3"
          />
        </div>
      </Modal>
    </div>
  );
};
export default AddNewRegion;
