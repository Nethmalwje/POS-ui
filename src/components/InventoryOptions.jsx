import { Button, Flex, theme } from "antd";

function InventoryOptions({ onClickAddStock }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="py-0">
      <Flex className="py-0" justify="space-between" align="center">
        <div className="py-0 lg:flex">
          <Button
            className=" font-bold border-sky-600 text-sky-500 hover:shadow-md lg:min-w-40"
            onClick={onClickAddStock}
          >
            Add New Stock
          </Button>
        </div>
        <div
          className="py-0"
          // style={{
          //   padding: 24,
          //   marginTop: 20,
          //   minHeight: 60,
          //   background: colorBgContainer,
          //   borderRadius: borderRadiusLG,
          // }}
        ></div>
      </Flex>
    </div>
  );
}

export default InventoryOptions;
