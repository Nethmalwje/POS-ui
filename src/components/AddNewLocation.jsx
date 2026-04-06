import { Divider, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

const AddNewLocation = ({ visible, onOk, onCancel, locations }) => {
  const [newLocationName, setNewLocationName] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  useEffect(() => {
    // Check if the region name already exists whenever newRegionName changes
    const exists = locations?.locations?.some(
      (location) =>
        location.name.toLowerCase() === newLocationName.toLowerCase()
    );
    setInputStatus(exists ? "error" : "");
  }, [newLocationName, locations]);

  const handleOk = () => {
    // Final check before submitting
    if (inputStatus === "error") {
      message.error(
        "Region name already exists. Please choose a different name."
      );
    } else {
      onOk(newLocationName); // Pass the new location name to the parent
      setNewLocationName(""); // Reset the input field
      setInputStatus(""); // Reset the input status
    }
  };

  return (
    <div>
      <Modal open={visible} onOk={onOk} onCancel={onCancel}>
        <p className=" font-semibold text-lg">Add New Location</p>
        <Divider />
        <div className=" pb-2 flex justify-between">
          <p>Location Name: </p>
          <Input
            value={newLocationName}
            onChange={(e) => {
              setNewLocationName(e.target.value);
            }}
            status={inputStatus}
            className=" w-2/3"
          />
        </div>
      </Modal>
    </div>
  );
};
export default AddNewLocation;
