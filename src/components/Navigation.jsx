import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  ProductOutlined,
  UserOutlined,
  UserAddOutlined,
  AreaChartOutlined,
  TransactionOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  FieldTimeOutlined,
  AlertOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { HiOutlineUsers } from "react-icons/hi2";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAction } from "../context/actionContext";
import { useUserData } from "../context/userContext";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleUpdatingUser } = useAction();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { user } = useUserData();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    getItem("Dashboard", "/dashboard", <AreaChartOutlined />),
    user?.role !== "Cashier" && user?.role !== "Inventory Manager"
      ? getItem("Users", "sub1", <UserOutlined />, [
          getItem("All Employee", "/users", <HiOutlineUsers />),

          // getItem("New User", "/create", <UserAddOutlined />),
          // getItem("My Profile", "/view", <UserOutlined />),
          getItem("Customers", "/customers", <HiOutlineUsers />),
        ])
      : null,
    user.role === "Cashier"
      ? getItem("New Customer", "/customers/register", <UserAddOutlined />)
      : null,
    user?.role === "Cashier"
      ? getItem("My Profile", "/view", <UserOutlined />)
      : null,
    getItem("Products", "sub2", <ProductOutlined />, [
      getItem("All Products", "/products", <UnorderedListOutlined />),
      getItem("Add New Product", "/create-product", <PlusCircleOutlined />),
    ]),
    getItem("Items", "sub3", <ProductOutlined />, [
      getItem("All Items", "/items", <UnorderedListOutlined />),
      getItem("Add New Item", "/create-item", <AppstoreAddOutlined />),
    ]),
    getItem("Expiry Stocks", "sub4", <ClockCircleOutlined />, [
      getItem("Expiring Stocks", "/expiring", <UnorderedListOutlined />),
      getItem("Expired Stocks", "/expired", <UnorderedListOutlined />),
    ]),
    getItem("Stocks", "sub5", <ProductOutlined />, [
      getItem("All Stock", "/stock", <UnorderedListOutlined />),
      getItem("Add New Stock", "/create-stock", <AppstoreAddOutlined />),
    ]),
    user.role === "General Manager" || user.role === "Regional Manager"
      ? getItem("Locations", "sub7", <ClusterOutlined />, [
          getItem("Regions", "/regions", <ApartmentOutlined />),
          getItem("Locations", "/locations", <ApartmentOutlined />),
        ])
      : null,

    user?.role === "Cashier"
      ? getItem("Stashed Bills", "/stashedBills", <FileTextOutlined />)
      : null,
    getItem("Transactions", "/transactions", <TransactionOutlined />),
  ];

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    if (e.key === "/create") {
      handleUpdatingUser(false);
    }

    navigate(e.key);
  };

  return (
    // <Sider
    //   theme="light"
    //   breakpoint="lg"
    //   collapsedWidth="0"
    //   width={250} // Set the width here (adjust as needed)
    //   onBreakpoint={(broken) => {
    //     console.log(broken);
    //   }}
    //   onCollapse={(collapsed, type) => {
    //     console.log(collapsed, type);
    //   }}
    // >
    //   <div className="demo-logo-vertical" />
    //   <div className="items-center w-2/4 h-auto pt-8 m-auto">
    //     <Logo />
    //   </div>
    //   <Menu
    //     className="mt-8 text-sm font-poppins font-semibold"
    //     theme="light"
    //     mode="inline"
    //     selectedKeys={[selectedKey]}
    //     onClick={handleMenuClick}
    //     items={items}
    //   />
    // </Sider>
    <Sider
      // theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      width={250} // Set the width here (adjust as needed)
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ backgroundColor: "#fcfcfc" }}
    >
      <div className="demo-logo-vertical" />

      <div className="items-center w-2/4 h-auto pt-8 m-auto">
        <Logo />
      </div>
      <Menu
        className="mt-8 text-sm font-poppins bg-inherit"
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={items}
      />

      {/* <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      /> */}
    </Sider>
  );
}

export default NavigationBar;
