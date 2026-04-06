import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useSearchParams } from "react-router-dom";
import ItemList from "../components/ItemList";

const AllItems = () => {
  const { Search } = Input;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchSize, setSearchSize] = useState("medium");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setSearchSize("small");
      } else {
        setSearchSize("medium");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchParams({ name: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-poppins md:text-left text-center mb-4">
        <strong>All Items</strong>
      </h1>
      <div className="w-full min-[768px]:w-10/12 xl:w-8/12 items-center justify-center mb-4">
        <div className="flex flex-col md:flex-row space-between items-center gap-x-6">
          <label className="text-sm font-semibold font-poppins whitespace-nowrap">
            <span>Search Item By Product Name</span>
          </label>
          <div className="w-full md:w-auto flex-grow">
            <Search
              className="w-full"
              placeholder="Search Item"
              enterButton="Search"
              size={searchSize}
              loading={false}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div>
        <ItemList className="h-full" />
      </div>
    </div>
  );
};

export default AllItems;
