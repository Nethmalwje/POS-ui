import { Alert, Button, Input, Pagination } from "antd";
import UserList from "../components/UserList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Selection from "../components/Selection";
import { UserAddOutlined } from "@ant-design/icons";
import { useAction } from "../context/actionContext";
import { useUsers } from "../hooks/useUsers";
import HourGlass from "../components/HourGlass";

function AllUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(10);
  const { Search } = Input;
  const [searchSize, setSearchSize] = useState("medium");
  const navigate = useNavigate();
  const { handleUpdatingUser } = useAction();
  const { isLoading, total } = useUsers();

  // const [pageSize, setPageSize] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [name, setName] = useState("");

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
    // setCurrentPage((page) => pageNumber);
  }

  function onSearchEmployee(value) {
    searchParams.set("name", value);
    setSearchParams(searchParams);
    // setName(name => value);
  }

  function onShowSizeChange(current, size) {
    searchParams.set("items", size);
    setSearchParams(searchParams);
    setLimit(size);
    // setPageSize(size);
  }

  function onSearchRole(value) {
    if (value === "All") {
      searchParams.set("role", "");
    } else {
      searchParams.set("role", value);
    }
    setSearchParams(searchParams);
  }

  function handleButtonClick() {
    handleUpdatingUser(false);
    navigate("/create");
  }

  if (isLoading) {
    return <HourGlass />;
  }

  return (
    <>
      <div className="mx-4 mt-4 h-full">
        <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
          <strong>All Employees</strong>
        </h1>
        <div className="flex flex-col justify-start">
          <div className="w-full items-center justify-center">
            <div className=" w-3/5 flex flex-col md:flex-row space-between items-center mx-4 gap-x-6">
              <label className="text-sm font-semibold font-poppins whitespace-nowrap">
                <span>Search Employee By Name</span>
              </label>
              <div className="w-full md:w-auto flex-grow">
                <Search
                  className="w-full"
                  placeholder="Search Employee"
                  enterButton="Search"
                  size={searchSize}
                  loading={false}
                  onSearch={onSearchEmployee}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col md:flex-row space-between items-center mx-4 my-2 gap-x-9">
                <label className="text-sm font-semibold font-poppins whitespace-nowrap">
                  <span>Search Employee By Role</span>
                </label>
                <div className="w-full md:w-auto flex-grow">
                  <Selection
                    searchSize={searchSize}
                    onSearchRole={onSearchRole}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-start mx-4 mb-2">
                <Button type="primary" onClick={handleButtonClick}>
                  <UserAddOutlined /> Add New Employee
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full">
          <UserList />
        </div>

        <div className="flex justify-center mt-3">
          <Pagination
            showQuickJumper
            showSizeChanger
            size={searchSize}
            defaultCurrent={1}
            total={total}
            pageSize={limit}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </div>
    </>
  );
}

export default AllUsers;
