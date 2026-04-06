import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
  FileTextOutlined,
  AreaChartOutlined,
  ProductOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  PlusCircleOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { HiOutlineUsers } from "react-icons/hi2";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

//import { useUserData } from "../context/userContext";

import Logo from "../Logo";
import { useAction } from "../../context/actionContext";
import UserData from "../UserData";
import { useUserData } from "../../context/userContext";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function Cashier_NavBar() {
  const { t } = useTranslation(["cashier"]);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleUpdatingUser } = useAction();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { user } = useUserData();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    getItem(t("cashier_nav.Dashboard"), "/dashboard", <AreaChartOutlined />),
    user?.role !== "Cashier"
      ? getItem(t("cashier_nav.Users"), "sub1", <UserOutlined />, [
          getItem(t("cashier_nav.See All Users"), "/users", <HiOutlineUsers />),

          getItem(
            t("cashier_nav.Add New User"),
            "/create",
            <UserAddOutlined />
          ),
          getItem(t("cashier_nav.My Profile"), "/view", <UserOutlined />),
          getItem(t("cashier_nav.Customers"), "/customers", <HiOutlineUsers />),
        ])
      : null,
    user.role === "Cashier"
      ? getItem(
          t("cashier_nav.Add New Customer"),
          "/customers/register",
          <UserAddOutlined />
        )
      : null,
    // user?.role === "Cashier"
    //   ? getItem(t("cashier_nav.My Profile"), "/view", <UserOutlined />)
    //   : null,
    // getItem("Products", "sub2", <ProductOutlined />, [
    //   getItem("See All Products", "/products", <UnorderedListOutlined />),
    //   getItem("Add New Product", "/create-product", <AppstoreAddOutlined />),
    //   getItem("See All Items", "/items", <UnorderedListOutlined />),
    //   getItem("Add Specific Item", "/create-item", <PlusCircleOutlined />),
    // ]),
    // getItem(
    //   t("cashier_nav.Transactions"),
    //   "/transactions",
    //   <TransactionOutlined />
    // ),

    user?.role === "Cashier"
      ? getItem(
          t("cashier_nav.Stashed Bills"),
          "/stashedBills",
          <FileTextOutlined />
        )
      : null,
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
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        position: "sticky",
        left: 0,
        top: 0,
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevents scrolling
      }}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
      // style={{
      //   backgroundColor: "#f0f0f5",
      //   background: "#f7f7f7 !important",
      //   height: "100vh", // Full viewport height
      //   overflow: "hidden", // Prevents scrolling
      // }}
    >
      <div className="demo-logo-vertical" />

      <div className="items-center w-2/4 h-auto pt-8 m-auto">
        <Logo />
      </div>
      <Menu
        className="mt-8 text-sm font-poppins font-semibold bg-inherit"
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

export default Cashier_NavBar;
