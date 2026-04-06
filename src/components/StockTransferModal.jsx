import { DownOutlined, SwapOutlined } from "@ant-design/icons";
import { Divider, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";


const StockTransferModal = ({ transferStock, isVisible, onOk, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [transferQuantity, setTransferQuantity] = useState(0);

  const fetchLocations = async () => {
    setIsLoading(true);
    const locationResponse = await axiosInstance_inventory.get("/locations");
    setLocations(locationResponse.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    setTransferQuantity(0);
  }, [isVisible]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOk = () => {
    // Validation for required fields
    if (!selectedLocation.location_id || transferQuantity <= 0) {
      toast.error("Sending location and Transfering Quantity are required.");
      return;
    }

    // Call the onOk function with the selected values
    onOk({
      stockId: transferStock.stock_id,
      qty: transferQuantity,
      src: transferStock.location_id,
      dest: selectedLocation.location_id,
    });
    // Reset the state if needed
    setSelectedLocation(null);
    setTransferQuantity(0);
  };

  const handleLocationSelect = (location) => {
    // console.log(location);
    setSelectedLocation(location);
    setIsOpen(false);
  };
  return (
    <Modal
      centered
      loading={isLoading}
      visible={isVisible}
      okText="Transfer"
      onOk={handleOk}
      onCancel={() => {
        onCancel();
        setSelectedLocation(null);
        setIsOpen(false);
      }}
    >
      <div>
        <p className=" font-semibold text-lg">
          Transfer Stocks <SwapOutlined />{" "}
        </p>
        <Divider />
        {transferStock && (
          <>
            <div className=" pb-2 flex justify-between">
              <p>Transfer: </p>
              <Input
                className=" w-2/3"
                value={transferStock.product_name}
                disabled
              />
            </div>
            <div className=" pb-2 flex justify-between">
              <p>Barcode: </p>
              <Input
                className=" w-2/3"
                value={transferStock.barcode}
                disabled
              />
            </div>
            <div className=" pb-2 flex justify-between">
              <p>From: </p>
              <Input
                className=" w-2/3"
                value={transferStock.location}
                disabled
              />
            </div>
            <div className=" pb-2 flex justify-between">
              <p>To: </p>
              <div className="relative w-2/3">
                <button
                  className="w-full border rounded-lg hover:border-primary-300 p-3 flex justify-between items-center bg-white h-8"
                  onClick={toggleDropdown}
                >
                  <span className="m-0">
                    {selectedLocation
                      ? selectedLocation.name
                      : "Select Location"}
                  </span>
                  <DownOutlined />
                </button>

                {isOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full z-10">
                    {locations
                      .filter(
                        (location) => location.name !== transferStock.location
                      )
                      .map((location) => (
                        <div
                          key={location.location_id}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleLocationSelect(location)}
                        >
                          {location.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className=" pb-2 flex justify-between">
              <p>Quantity: </p>
              <InputNumber
                className=" w-2/3"
                value={transferQuantity}
                onChange={setTransferQuantity}
                min={0}
                max={transferStock.quantity}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
export default StockTransferModal;
