import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Input, Layout, Menu, Space, theme } from "antd";
import AddSale from "../../components/cashier/AddSale";
import BillSider from "../../components/cashier/BIllSider";
import SearchItem from "../../components/cashier/SearchItem";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const Cashier_Dash = () => {
  const [bill, setBill] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const invalue = "beffore click";
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Layout className="mt-8">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {/* <div>
                <div>
                  <Space>
                    <Space.Compact size="large">
                      <Input placeholder="enter BarCode" />
                      <Input
                        value={invalue}
                        //   addonAfter={<Button type="primary">Submit</Button>}
                        placeholder="enter quantity"
                      />
                      <Button type="primary" onClick={setBill(value)}>
                        Submit
                      </Button>
                    </Space.Compact>
                  </Space>
                </div>
                <div className="mt-5">
                  <Button type="primary">Scan Barcode</Button>
                </div>
              </div> */}
              <div>
                <AddSale setVariable={setBill} />
              </div>
              <div>
                <div className="text-2xl mt-8">Find Item</div>
                <SearchItem setVariable={setBill} />
              </div>
              Bill is a cat.
              {console.log({ bill })}
            </div>
          </Content>
          <Sider
            width={"400px"}
            style={{
              margin: "0 16px",
              background: "white",
            }}
          >
            {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}

            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div>
                <BillSider value={bill} />
              </div>
              Bill is a cat.
            </div>
          </Sider>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Cashier_Dash;
