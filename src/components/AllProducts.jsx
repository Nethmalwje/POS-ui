import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "antd";
import ProductList from "../components/ProductList";

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(10);
  const { Search } = Input;
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

  function onChangePage(pageNumber) {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  }

  function onSearchProduct(value) {
    searchParams.set("name", value);
    setSearchParams(searchParams);
  }

  function onShowSizeChange(current, size) {
    searchParams.set("items", size);
    setSearchParams(searchParams);
    setLimit(size);
  }

  function onSearchRole(value) {
    if (value === "All") {
      searchParams.set("role", "");
    } else {
      searchParams.set("role", value);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="mx-4 mt-4">
      <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
        <strong>All Products</strong>
      </h1>
      <div className="w-full min-[768px]:w-10/12 xl:w-8/12 items-center justify-center">
        <div className="flex flex-col md:flex-row space-between items-center m-4 gap-x-6">
          <label className="text-sm font-semibold font-poppins whitespace-nowrap">
            <span>Search Product By Name</span>
          </label>
          <div className="w-full md:w-auto flex-grow">
            <Search
              className="w-full"
              placeholder="Search Product"
              enterButton="Search"
              size={searchSize}
              loading={false}
              onSearch={onSearchProduct}
            />
          </div>
        </div>
      </div>
      <div>
        <ProductList className="h-full" />
      </div>
    </div>
  );
};

export default AllProducts;
