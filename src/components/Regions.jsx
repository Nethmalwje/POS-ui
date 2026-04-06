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

function Regions() {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [newRegionVisible, setNewRegionVisible] = useState(false);
  const [searchNameText, setSearchNameText] = useState("");
  const [searchBarcodeText, setSearchBarcodeText] = useState("");

  const { fullUser: user } = useUserData();

  const fetchRegions = async () => {
    try {
      setLoading(true);
      const regionsResponse = await axiosInstance_inventory.get("/regions");
      const filteredRegions = regionsResponse.data.filter((region) => {
        return region.name.includes(searchNameText); // Explicitly return the boolean value
      });
      setRegions(filteredRegions);
      // setRegions(regionsHC);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRegions();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchRegions();
  };

  const handleNewRegionOk = () => {
    setNewRegionVisible(false);
  };

  const handleNewRegionCancel = () => {
    setNewRegionVisible(false);
  };

  return (
    <div>
      <Modal className=" max-w-96" visible={false}>
        <p className=" font-bold text-xl">Edit Region</p>
        <Divider className=" my-2" />
        <div className=" flex gap-4">
          <>
            <div className=" font-medium">Manager: </div>

            <Dropdown
              menu={{
                regions,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Click me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </>
        </div>
      </Modal>
      <div className=" mb-5">
        <div className=" pt-5 flex justify-between">
          <h2 className="text-lg font-poppins font-semibold">Regions</h2>
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
          regions.map((region, index) => (
            <div key={index} className=" p-0  ">
              <RegionCard region={region} />
            </div>
          ))
        )}
        <Button
          onClick={() => {
            setNewRegionVisible(true);
          }}
          className="p-0 h-full text-center align-middle rounded-lg border bg-gray-100 border-gray-500 w-full hover:shadow-primary-1 hover:border-gray-400 hover:bg-primary-100 flex flex-col items-center justify-center"
        >
          <PlusCircleOutlined className="text-4xl" />
          <p className="mt-2">Add New Region</p>
        </Button>
        <AddNewRegion
          visible={newRegionVisible}
          onOk={handleNewRegionOk}
          onCancel={handleNewRegionCancel}
          regions={regions}
        />
      </div>
    </div>
  );
}

export default Regions;
