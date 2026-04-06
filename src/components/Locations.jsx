import {
  CloseSquareOutlined,
  DownOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, Modal, Skeleton, Space } from "antd";
import RefreshButton from "./RefreshButton";
import Search from "antd/es/transfer/search";
import RegionCard from "./RegionCard";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";
import { useUserData } from "../context/userContext";
import { useEffect, useState } from "react";
import AddNewRegion from "./AddNewRegion";
import AddNewLocation from "./AddNewLocation";
import LocationCard from "./LocationCard";

function Locations() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [newLocationVisible, setNewLocationVisible] = useState(false);
  const [searchNameText, setSearchNameText] = useState("");

  const { fullUser: user } = useUserData();

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const locationsResponse = await axiosInstance_inventory.get("/locations");
      setLocations(locationsResponse.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLocations();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchLocations();
  };

  const handleNewLocationOk = () => {
    setNewLocationVisible(false);
  };

  const handleNewLocationCancel = () => {
    setNewLocationVisible(false);
  };

  return (
    <div>
      <div className=" mb-5">
        <div className=" pt-5 flex justify-between">
          <h2 className="text-lg font-poppins font-semibold">Locations</h2>
          <RefreshButton onRefresh={handleRefresh} />
        </div>
        <Divider />
        {/* <div className="pt-5 flex gap-5">
          <Search
            placeholder="Search by Region"
            value={searchNameText}
            onChange={(e) => {
              setSearchNameText(e.target.value);
            }}
            // onSearch={}
          />
          <Search
            placeholder="Search by Manager"
            // value={}
            onChange={(e) => {}}
            // onSearch={}
          />
          <Button color="default" className=" w-1/6" onClick={() => {}}>
            <CloseSquareOutlined />
            {" Clear Filters"}
          </Button>
        </div> */}
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading ? (
          <Skeleton className=" min-w-1/3" active={true} />
        ) : (
          locations?.locations?.map((location, index) => (
            <div key={index} className=" p-0  ">
              <LocationCard location={location} />
            </div>
          ))
        )}
        <Button
          onClick={() => {
            setNewLocationVisible(true);
          }}
          className="p-0 h-full text-center align-middle rounded-lg border bg-gray-100 border-gray-500 w-full hover:shadow-primary-1 hover:border-gray-400 hover:bg-primary-100 flex flex-col items-center justify-center"
        >
          <PlusCircleOutlined className="text-4xl" />
          <p className="mt-2">Add New Location</p>
        </Button>
        <AddNewLocation
          visible={newLocationVisible}
          onOk={handleNewLocationOk}
          onCancel={handleNewLocationCancel}
          locations={locations}
        />
      </div>
    </div>
  );
}

export default Locations;
