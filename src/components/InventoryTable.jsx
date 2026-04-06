import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import InventoryOptions from "./InventoryOptions";
import AddStockForm from "./AddStockForm";

function InventoryTable({ userData, handleCheckItem }) {
  // const [dataSource, setDataSource] = useState([
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
  //   },
  //   {
  //     stock_id: 8,
  //     item_id: 4,
  //     batch_no: 5,
  //     quantity: "60.500",
  //     selling_price: "30.00",
  //     mfd: "2024-08-08",
  //     exp: "2026-08-08",
  //     product_name: "Vinegar",
  //     unit_weight: "1.000",
  //   },
  //   {
  //     stock_id: 11,
  //     item_id: 5,
  //     batch_no: 2,
  //     quantity: "75.000",
  //     selling_price: "40.00",
  //     mfd: "2024-08-11",
  //     exp: "2026-08-11",
  //     product_name: "Oats",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 14,
  //     item_id: 6,
  //     batch_no: 3,
  //     quantity: "40.000",
  //     selling_price: "90.00",
  //     mfd: "2024-08-14",
  //     exp: "2026-08-14",
  //     product_name: "Quinoa",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 17,
  //     item_id: 7,
  //     batch_no: 1,
  //     quantity: "85.000",
  //     selling_price: "30.00",
  //     mfd: "2024-08-17",
  //     exp: "2024-08-27",
  //     product_name: "Tomato Sauce",
  //     unit_weight: "0.400",
  //   },
  //   {
  //     stock_id: 20,
  //     item_id: 8,
  //     batch_no: 1,
  //     quantity: "100.000",
  //     selling_price: "50.00",
  //     mfd: "2024-08-20",
  //     exp: "2026-08-20",
  //     product_name: "Peanut Butter",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 8,
  //     item_id: 4,
  //     batch_no: 5,
  //     quantity: "60.500",
  //     selling_price: "30.00",
  //     mfd: "2024-08-08",
  //     exp: "2026-08-08",
  //     product_name: "Vinegar",
  //     unit_weight: "1.000",
  //   },
  //   {
  //     stock_id: 11,
  //     item_id: 5,
  //     batch_no: 2,
  //     quantity: "75.000",
  //     selling_price: "40.00",
  //     mfd: "2024-08-11",
  //     exp: "2026-08-11",
  //     product_name: "Oats",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 14,
  //     item_id: 6,
  //     batch_no: 3,
  //     quantity: "40.000",
  //     selling_price: "90.00",
  //     mfd: "2024-08-14",
  //     exp: "2026-08-14",
  //     product_name: "Quinoa",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 17,
  //     item_id: 7,
  //     batch_no: 1,
  //     quantity: "85.000",
  //     selling_price: "30.00",
  //     mfd: "2024-08-17",
  //     exp: "2024-08-27",
  //     product_name: "Tomato Sauce",
  //     unit_weight: "0.400",
  //   },
  //   {
  //     stock_id: 20,
  //     item_id: 8,
  //     batch_no: 1,
  //     quantity: "100.000",
  //     selling_price: "50.00",
  //     mfd: "2024-08-20",
  //     exp: "2026-08-20",
  //     product_name: "Peanut Butter",
  //     unit_weight: "0.500",
  //   },
  // ]);

  const [dataSource, setDataSource] = useState([
    {
      stock_id: 1,
      item_id: 1,
      batch_no: 3,
      quantity: "100.000",
      selling_price: "80.00",
      mfd: "2024-08-01",
      exp: "2024-10-01",
      product_name: "Rice",
      unit_weight: "1.000",
      barcode: 1234567890123,
    },
    {
      stock_id: 2,
      item_id: 2,
      batch_no: 1,
      quantity: "200.000",
      selling_price: "60.00",
      mfd: "2024-08-02",
      exp: "2026-08-02",
      product_name: "Pasta",
      unit_weight: "0.500",
      barcode: 1234567890124,
    },
    {
      stock_id: 3,
      item_id: 3,
      batch_no: 8,
      quantity: "150.500",
      selling_price: "50.00",
      mfd: "2024-08-03",
      exp: "2026-08-03",
      product_name: "Sugar",
      unit_weight: "1.000",
      barcode: 1234567890125,
    },
    {
      stock_id: 4,
      item_id: 4,
      batch_no: 5,
      quantity: "60.500",
      selling_price: "30.00",
      mfd: "2024-08-08",
      exp: "2026-08-08",
      product_name: "Vinegar",
      unit_weight: "1.000",
      barcode: 1234567890126,
    },
    {
      stock_id: 5,
      item_id: 5,
      batch_no: 2,
      quantity: "75.000",
      selling_price: "40.00",
      mfd: "2024-08-11",
      exp: "2026-08-11",
      product_name: "Oats",
      unit_weight: "0.500",
      barcode: 1234567890127,
    },
    {
      stock_id: 6,
      item_id: 6,
      batch_no: 3,
      quantity: "40.000",
      selling_price: "90.00",
      mfd: "2024-08-14",
      exp: "2026-08-14",
      product_name: "Quinoa",
      unit_weight: "0.500",
      barcode: 1234567890128,
    },
    {
      stock_id: 7,
      item_id: 7,
      batch_no: 1,
      quantity: "85.000",
      selling_price: "30.00",
      mfd: "2024-08-17",
      exp: "2024-08-27",
      product_name: "Tomato Sauce",
      unit_weight: "0.400",
      barcode: 1234567890129,
    },
    {
      stock_id: 8,
      item_id: 8,
      batch_no: 1,
      quantity: "100.000",
      selling_price: "50.00",
      mfd: "2024-08-20",
      exp: "2026-08-20",
      product_name: "Peanut Butter",
      unit_weight: "0.500",
      barcode: 1234567890130,
    },
    {
      stock_id: 9,
      item_id: 9,
      batch_no: 4,
      quantity: "120.000",
      selling_price: "70.00",
      mfd: "2024-09-01",
      exp: "2026-09-01",
      product_name: "Honey",
      unit_weight: "0.500",
      barcode: 1234567890131,
    },
    {
      stock_id: 10,
      item_id: 10,
      batch_no: 6,
      quantity: "90.000",
      selling_price: "25.00",
      mfd: "2024-09-05",
      exp: "2026-09-05",
      product_name: "Olive Oil",
      unit_weight: "1.000",
      barcode: 1234567890132,
    },
    {
      stock_id: 11,
      item_id: 11,
      batch_no: 7,
      quantity: "110.000",
      selling_price: "55.00",
      mfd: "2024-09-10",
      exp: "2026-09-10",
      product_name: "Almonds",
      unit_weight: "0.250",
      barcode: 1234567890133,
    },
    {
      stock_id: 12,
      item_id: 12,
      batch_no: 9,
      quantity: "70.000",
      selling_price: "45.00",
      mfd: "2024-09-15",
      exp: "2026-09-15",
      product_name: "Cashews",
      unit_weight: "0.250",
      barcode: 1234567890134,
    },
    {
      stock_id: 13,
      item_id: 13,
      batch_no: 10,
      quantity: "130.000",
      selling_price: "35.00",
      mfd: "2024-09-20",
      exp: "2026-09-20",
      product_name: "Peas",
      unit_weight: "0.500",
      barcode: 1234567890135,
    },
    {
      stock_id: 14,
      item_id: 14,
      batch_no: 11,
      quantity: "150.000",
      selling_price: "20.00",
      mfd: "2024-09-25",
      exp: "2026-09-25",
      product_name: "Lentils",
      unit_weight: "1.000",
      barcode: 1234567890136,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  // const [form] = Form.useForm();
  // const [columns, setColumn] = useState();
  // const [dataSource, setDataSource] = useState(dataSourceData);

  useEffect(() => {}, []);

  const columns = [
    {
      title: "Item No.",
      dataIndex: "item_id",
      key: "item",
    },
    {
      title: "Item Name",
      dataIndex: "product_name",
      key: "name",
    },
    {
      title: "Batch No",
      dataIndex: "batch_no",
      key: "batch",
    },
    {
      title: "MFD",
      dataIndex: "mfd",
      key: "mfd",
      sorter: (a, b) => new Date(a.mfd) - new Date(b.mfd),
    },
    {
      title: "EXP",
      dataIndex: "exp",
      key: "exp",
      sorter: (a, b) => new Date(a.exp) - new Date(b.exp),
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      onFilter: (value, record) => record.manager === value,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      onFilter: (value, record) => record.quantity === value,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleTableDelete(item.stock_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];
  // const dataSource = [
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
  //   },
  //   {
  //     stock_id: 8,
  //     item_id: 8,
  //     batch_no: 5,
  //     quantity: "60.500",
  //     selling_price: "30.00",
  //     mfd: "2024-08-08",
  //     exp: "2026-08-08",
  //     product_name: "Vinegar",
  //     unit_weight: "1.000",
  //   },
  //   {
  //     stock_id: 11,
  //     item_id: 11,
  //     batch_no: 2,
  //     quantity: "75.000",
  //     selling_price: "40.00",
  //     mfd: "2024-08-11",
  //     exp: "2026-08-11",
  //     product_name: "Oats",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 14,
  //     item_id: 14,
  //     batch_no: 3,
  //     quantity: "40.000",
  //     selling_price: "90.00",
  //     mfd: "2024-08-14",
  //     exp: "2026-08-14",
  //     product_name: "Quinoa",
  //     unit_weight: "0.500",
  //   },
  //   {
  //     stock_id: 17,
  //     item_id: 17,
  //     batch_no: 1,
  //     quantity: "85.000",
  //     selling_price: "30.00",
  //     mfd: "2024-08-17",
  //     exp: "2024-08-27",
  //     product_name: "Tomato Sauce",
  //     unit_weight: "0.400",
  //   },
  //   {
  //     stock_id: 20,
  //     item_id: 20,
  //     batch_no: 1,
  //     quantity: "100.000",
  //     selling_price: "50.00",
  //     mfd: "2024-08-20",
  //     exp: "2026-08-20",
  //     product_name: "Peanut Butter",
  //     unit_weight: "0.500",
  //   },
  // ];

  const existingProducts = dataSource.map((item) => ({
    product_name: item.product_name,
    barcode: item.barcode,
  }));

  const filteredData = dataSource.filter((item) =>
    item.product_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredItem = dataSource.filter((item) =>
    item.product_name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleTableSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleTableDelete = (key) => {
    const index = dataSource.findIndex((item) => item.stock_id === key);
    if (index !== -1) {
      const updatedData = dataSource.filter((item) => item.stock_id !== key);
      setDataSource(updatedData);
    } else {
      console.log("Item does not exists.");
    }
  };

  const showModal = () => {
    console.log("Showing Model");
    setIsModalVisible(true);
  };

  const closeModal = () => {
    console.log("Closing Model");
    setIsModalVisible(false);
  };

  const handleFormSubmit = (data) => {
    setFormData(data); // Store the form data in state
    const mfd = `${String(data.mfd.getFullYear())}-${String(
      data.mfd.getMonth() + 1
    ).padStart(2, "0")}-${String(data.mfd.getDate()).padStart(2, "0")}`;
    const exp = `${String(data.exp.getFullYear())}-${String(
      data.exp.getMonth() + 1
    ).padStart(2, "0")}-${String(data.exp.getDate()).padStart(2, "0")}`;
    const newStock = {
      stock_id: 256,
      item_id: 256,
      batch_no: 256,
      quantity: data.quantity,
      selling_price: data.selling_price,
      mfd: mfd,
      exp: exp,
      product_name: data.product_name,
      unit_weight: data.unit_weight,
      barcode: data.barcode,
    };
    console.log("Form Data Submitted:", data); // You can handle the data as needed
    const addNewStock = (newStock) => {
      setDataSource((prevDataSource) => [...prevDataSource, newStock]);
    };
    closeModal(); // Close the modal after submission
    // Hereeeeeeeeeeee handle add stock
  };

  return (
    <>
      <AddStockForm
        existingProducts={existingProducts}
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
      {/* <Modal
        title="Add Stock"
        visible={isAddStockVisible}
        onOk={handleAddStockOk}
        onCancel={handleAddStockCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={form}
          layout="horizontal"
          // style={{ maxWidth: 1000 }}
        >
          <Form.Item name="dropdown" label="Select Item">
            <Select
              showSearch
              placeholder="Select or add an item"
              value={searchText}
              onSearch={handleModalSearch}
              onSelect={handleModalSelect}
              onChange={handleModalSearch} // Update input value
              filterOption={false} // Disable default filtering
            >
              {filteredItem.map((item, index) => (
                <Option key={index} value={item.item_id}>
                  {item.product_name}
                </Option>
              ))}
              <Option key="add" value={searchText} disabled={!searchText}>
                <Button disabled={true}>+ Add New Item</Button>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="name" label="Item Name">
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
            <Input onChange={handleCheckItem} />
          </Form.Item>

          <Form.Item name="Batch No" label="Batch No.">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="Quantity" label="Quantity">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="mfd/exp" label="MFD - EXP">
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

          <Form.Item name="buying price" label="Buying Price">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="selling price" label="Selling Price">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="unit weight" label="Unit Weight">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="selling price" label="Selling Price">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="selling price" label="Selling Price">
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
      <div className=" flex mb-5 font-semibold">
        <Search placeholder="Search Item Name" onChange={handleTableSearch} />
        <div className=" ml-5">
          <InventoryOptions onClickAddStock={showModal} />
        </div>
      </div>
      <div className=" font-semibold">
        <Table
          scroll={{ y: 300 }}
          columns={columns}
          dataSource={filteredData}
          // loading={loading}
          pagination={false}
          rowKey="item"
        />
      </div>
    </>
  );
}

export default InventoryTable;
