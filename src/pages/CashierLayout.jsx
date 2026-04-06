import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Navigation";
import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import Profile from "../components/Profile";
import { useUserData } from "../context/userContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import HourGlass from "../components/HourGlass";
import PasswordAlert from "../components/PasswordAlert";
import Cashier_NavBar from "../components/cashier/Cashier_NavBar";
import HeaderSearch from "../components/HeaderSearch";
import Notifications from "../components/Notifications";
import NightModeButton from "../components/NightModeButton";

const { Header, Content, Footer } = Layout;

function CashierLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isLoading, user } = useCurrentUser();
  const { storeFullUser } = useUserData();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isLoading && user) {
      storeFullUser(user);
    }
  }, [isLoading, user, storeFullUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HourGlass />;
  }

  return (
    <>
      <PasswordAlert
        visible={visible}
        temporary={user?.temporary}
        setVisible={setVisible}
      />
      <Layout style={{ minHeight: "100vh" }}>
        <Cashier_NavBar
          style={{
            width: "100%",
          }}
        />
        <Layout
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#e0e0e0",
            position: "sticky",
            overflow: "hidden",
          }}
        >
          <Header
            className="p-0 md:h-20 h-14 w-full flex flex-row items-center justify-center  "
            theme="light"
            style={{
              position: "sticky",
              backgroundColor: "#ffff",
              color: "#333333",
              overflow: "hidden",
            }}
          >
            <div className="w-full flex items-center">
              <div className="flex flex-row items-center gap-6 ml-auto mr-9">
                <Notifications />
                <NightModeButton />
                <Profile />
              </div>
            </div>
          </Header>
          <Content
            className="w-full p-6 min-h-[360px] "
            style={{
              flex: 1,
              //background: "#fcfcfc",
              padding: "24px",
              overflowY: "auto",
            }}
          >
            {/* <div
              className="p-6 min-h-[360px]  "
              style={{
                background: `linear-gradient(150deg, #ffffff, #ffffff)`,
                borderRadius: borderRadiusLG,
              }}
            > */}
            <Outlet />

            {/* </div> */}
          </Content>
          <Footer className="text-center h-10 flex justify-center items-center">
            <h3 className="text-sm mb-6">
              Smart POS cashier System ©{new Date().getFullYear()} Created by
              Polos Community
            </h3>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default CashierLayout;

// import React, { useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Button, Layout, Menu, theme } from "antd";
// import { Outlet } from "react-router-dom";
// const { Header, Sider, Content } = Layout;
// const CashierLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <>
//       {/* <PasswordAlert
//         visible={visible}
//         temporary={user?.temporary}
//         setVisible={setVisible}
//       /> */}
//       <Layout
//         style={{
//           minHeight: "100vh",
//         }}
//       >
//         <Sider trigger={null} collapsible collapsed={collapsed}>
//           <div className="demo-logo-vertical" />
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             items={[
//               {
//                 key: "1",
//                 icon: <UserOutlined />,
//                 label: "nav 1",
//               },
//               {
//                 key: "2",
//                 icon: <VideoCameraOutlined />,
//                 label: "nav 2",
//               },
//               {
//                 key: "3",
//                 icon: <UploadOutlined />,
//                 label: "nav 3",
//               },
//             ]}
//           />
//         </Sider>

//         <Layout>
//           <Header
//             style={{
//               padding: 0,
//               background: colorBgContainer,
//             }}
//           >
//             <Button
//               type="text"
//               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               onClick={() => setCollapsed(!collapsed)}
//               style={{
//                 fontSize: "16px",
//                 width: 64,
//                 height: 64,
//               }}
//             />
//             <div className="flex  mr-4">
//               <Profile />
//             </div>
//           </Header>
//           <Content
//             style={{
//               margin: "24px 16px",
//               padding: 24,
//               minHeight: 280,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet></Outlet>
//             Content
//           </Content>
//         </Layout>
//       </Layout>
//     </>
//   );
// };
// export default CashierLayout;
