//import React, { useEffect, useState } from "react";
//import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
//import moment from "moment";
// import CardContainer from "../components/CardContainer";
import // DesktopOutlined,
//  FileOutlined,
// PieChartOutlined,
//TeamOutlined,
// UserOutlined,
"@ant-design/icons";
import { Flex, Layout } from "antd";
// import InventoryOptions from "../components/InventoryOptions";
import InventoryInfo from "../components/InventoryInfo";
// import AllItems from "../components/AllItems";
import InventoryTable from "../components/InventoryTable";
// import MyDetails from "../components/MyDetails";
// import axios from "axios";
import AddStockForm from "../components/AddStockForm";

// const { Option } = Select;
// const options = ["Option 1", "Option 2", "Option 3"];
// const { RangePicker } = DatePicker;
const { Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// const token = {
//   employee_id: 3,
//   name: "nethmal",
//   email: "netha@gmail.com",
//   mobile: "0771234567",
//   location_id: 4,
//   role: "Store Manager",
// };

// const columnsData = [
//   {
//     title: "Item Code",
//     dataIndex: "item",
//     key: "item",
//     width: "10%",
//   },
//   {
//     title: "Item Name",
//     dataIndex: "name",
//     key: "name",
//     //   width: "10%",
//   },
//   {
//     title: "Batch No",
//     dataIndex: "batch",
//     key: "batch",
//     width: "12%",
//   },
//   {
//     title: "MFD",
//     dataIndex: "mfd",
//     key: "mfd",
//     width: "12%",
//     // sorter: (a, b) => new Date(a.mfd) - new Date(b.mfd),
//   },
//   {
//     title: "EXP",
//     dataIndex: "exp",
//     key: "exp",
//     width: "12%",
//     // sorter: (a, b) => new Date(a.exp) - new Date(b.exp),
//   },
//   {
//     title: "manager",
//     dataIndex: "manager",
//     key: "manager",
//     width: "12%",
//     // onFilter: (value, record) => record.manager === value,
//   },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     key: "quantity",
//     width: "15%",
//     // onFilter: (value, record) => record.quantity === value,
//   },
// ];

// const dataSourceData = [
//   {
//     stock_id: 1,
//     item_id: 1,
//     batch_no: 3,
//     quantity: "100.000",
//     selling_price: "80.00",
//     mfd: "2024-08-01",
//     exp: "2024-10-01",
//     product_name: "Rice",
//     unit_weight: "1.000",
//     barcode: 1234567890123,
//   },
//   {
//     stock_id: 2,
//     item_id: 2,
//     batch_no: 1,
//     quantity: "200.000",
//     selling_price: "60.00",
//     mfd: "2024-08-02",
//     exp: "2026-08-02",
//     product_name: "Pasta",
//     unit_weight: "0.500",
//     barcode: 1234567890124,
//   },
//   {
//     stock_id: 3,
//     item_id: 3,
//     batch_no: 8,
//     quantity: "150.500",
//     selling_price: "50.00",
//     mfd: "2024-08-03",
//     exp: "2026-08-03",
//     product_name: "Sugar",
//     unit_weight: "1.000",
//     barcode: 1234567890125,
//   },
//   {
//     stock_id: 4,
//     item_id: 4,
//     batch_no: 5,
//     quantity: "60.500",
//     selling_price: "30.00",
//     mfd: "2024-08-08",
//     exp: "2026-08-08",
//     product_name: "Vinegar",
//     unit_weight: "1.000",
//     barcode: 1234567890126,
//   },
//   {
//     stock_id: 5,
//     item_id: 5,
//     batch_no: 2,
//     quantity: "75.000",
//     selling_price: "40.00",
//     mfd: "2024-08-11",
//     exp: "2026-08-11",
//     product_name: "Oats",
//     unit_weight: "0.500",
//     barcode: 1234567890127,
//   },
//   {
//     stock_id: 6,
//     item_id: 6,
//     batch_no: 3,
//     quantity: "40.000",
//     selling_price: "90.00",
//     mfd: "2024-08-14",
//     exp: "2026-08-14",
//     product_name: "Quinoa",
//     unit_weight: "0.500",
//     barcode: 1234567890128,
//   },
//   {
//     stock_id: 7,
//     item_id: 7,
//     batch_no: 1,
//     quantity: "85.000",
//     selling_price: "30.00",
//     mfd: "2024-08-17",
//     exp: "2024-08-27",
//     product_name: "Tomato Sauce",
//     unit_weight: "0.400",
//     barcode: 1234567890129,
//   },
//   {
//     stock_id: 8,
//     item_id: 8,
//     batch_no: 1,
//     quantity: "100.000",
//     selling_price: "50.00",
//     mfd: "2024-08-20",
//     exp: "2026-08-20",
//     product_name: "Peanut Butter",
//     unit_weight: "0.500",
//     barcode: 1234567890130,
//   },
//   {
//     stock_id: 9,
//     item_id: 9,
//     batch_no: 4,
//     quantity: "120.000",
//     selling_price: "70.00",
//     mfd: "2024-09-01",
//     exp: "2026-09-01",
//     product_name: "Honey",
//     unit_weight: "0.500",
//     barcode: 1234567890131,
//   },
//   {
//     stock_id: 10,
//     item_id: 10,
//     batch_no: 6,
//     quantity: "90.000",
//     selling_price: "25.00",
//     mfd: "2024-09-05",
//     exp: "2026-09-05",
//     product_name: "Olive Oil",
//     unit_weight: "1.000",
//     barcode: 1234567890132,
//   },
//   {
//     stock_id: 11,
//     item_id: 11,
//     batch_no: 7,
//     quantity: "110.000",
//     selling_price: "55.00",
//     mfd: "2024-09-10",
//     exp: "2026-09-10",
//     product_name: "Almonds",
//     unit_weight: "0.250",
//     barcode: 1234567890133,
//   },
//   {
//     stock_id: 12,
//     item_id: 12,
//     batch_no: 9,
//     quantity: "70.000",
//     selling_price: "45.00",
//     mfd: "2024-09-15",
//     exp: "2026-09-15",
//     product_name: "Cashews",
//     unit_weight: "0.250",
//     barcode: 1234567890134,
//   },
//   {
//     stock_id: 13,
//     item_id: 13,
//     batch_no: 10,
//     quantity: "130.000",
//     selling_price: "35.00",
//     mfd: "2024-09-20",
//     exp: "2026-09-20",
//     product_name: "Peas",
//     unit_weight: "0.500",
//     barcode: 1234567890135,
//   },
//   {
//     stock_id: 14,
//     item_id: 14,
//     batch_no: 11,
//     quantity: "150.000",
//     selling_price: "20.00",
//     mfd: "2024-09-25",
//     exp: "2026-09-25",
//     product_name: "Lentils",
//     unit_weight: "1.000",
//     barcode: 1234567890136,
//   },
// ];

//const items = [getItem("Dashboard", "1", <PieChartOutlined />)];
const InventoryDashboard = () => {
  // const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // const [isAddStockVisible, setIsAddStockVisible] = useState(false);
  // const [isExpiringVisible, setIsExpiringVisible] = useState(false);
  //const [searchText, setSearchText] = useState("");
  // const [form] = Form.useForm();
  const userData = {
    employee_id: 12,
    name: "Yapa",
    role: "Store Manager",
    location_id: 1,
    location: "Gampaha",
  };

  // const handleAddStockVisible = () => {
  //   setIsAddStockVisible(true);
  // };

  // const handleExpiringVisible = () => {
  //   setIsExpiringVisible(true);
  // };

  // const handleAddStockOk = () => {
  //   console.log("Handling OK.");
  //   setIsAddStockVisible(false);
  // };

  // const handleAddStockCancel = () => {
  //   console.log("Handling Cancel.");
  //   setIsAddStockVisible(false);
  // };

  // const handleExpiringCancel = () => {
  //   console.log("Handling Cancel.");
  //   setIsExpiringVisible(false);
  // };

  // const handleExpiringOptionSelect = (type) => {
  //   console.log(`Loading ${type} stocks.`);
  // };

  // const handleCheckItem = (e) => {
  //   setSearchText(e.target.value);

  //   if (
  //     dataSourceData.filter((item) =>
  //       item.name.toLowerCase().includes(e.target.value.toLowerCase())
  //     ).length
  //   ) {
  //     return "Item Already Exists";
  //   } else if (e.target.value === "") {
  //     return "Item name is required";
  //   }
  // };

  return (
    <>
      <Content>
        <div>
          <div className="mb-0">
            <Flex className=" justify-between align-middle mb-5">
              <div>
                <div className=" font-bold text-xl mr-4">Inventory Stocks</div>
                <div className=" text-gray-400">
                  <InventoryInfo />
                </div>
              </div>
              <div>
                {/* <InventoryOptions onClickAddStock={handleAddStockVisible} /> */}
              </div>
            </Flex>
          </div>
          <div
          // style={{ margin: "4% 0%" }}
          >
            <InventoryTable userData={userData} />
            {/* <Modal
              title="Add Stock"
              visible={isAddStockVisible}
              onOk={handleAddStockOk}
              onCancel={handleAddStockCancel}
            >
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                layout="horizontal"
                style={{ maxWidth: 400 }}
              >
                <Form.Item
                  name="name"
                  label="Item Name"
                  // labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: "Item name is required",
                    },
                  ]}
                >
                  <Input onChange={handleCheckItem} />
                </Form.Item>
                <Form.Item
                  name="Batch No"
                  label="Batch No."
                  // labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input the Batch number!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  name="Quantity"
                  label="Quantity"
                  // labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input the quantity!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  name="mfd/exp"
                  label="MFD - EXP"
                  rules={[
                    {
                      required: true,
                      message: "Please input the MFD and Exp!",
                    },
                  ]}
                >
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      "This Month": [moment(), moment().endOf("month")],
                    }}
                    showTime
                    format="YYYY/MM/DD"
                    // onChange={}
                  />
                </Form.Item>
                <div className="flex">
                  <Form.Item
                    name="buying price"
                    label="Buying Price"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Buying Price!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    name="selling price"
                    label="Selling Price"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Selling Price!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </div>
                <Form.Item
                  name="unit weight"
                  label="Unit Weight"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Unit Weight!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  name="selling price"
                  label="Selling Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Selling Price!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  name="selling price"
                  label="Selling Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Selling Price!",
                    },
                  ]}
                >
                  <Select
                    // value={selectedValue}
                    // onChange={handleChange}
                    placeholder="Select an option"
                  >
                    {options.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Modal> */}
            <AddStockForm />
            {/* <Modal
              title="Select Expiring Item Type"
              visible={isExpiringVisible}
              onCancel={handleExpiringCancel}
              footer={null}
            >
              <Button
                onClick={() => handleExpiringOptionSelect("expiring")}
                // style={{ marginRight: 8 }}
              >
                Expiring Soon
              </Button>
              <Button onClick={() => handleExpiringOptionSelect("expired")}>
                Expired
              </Button>
            </Modal> */}
          </div>
        </div>
      </Content>
    </>
  );
};
export default InventoryDashboard;
