import React, { useState } from "react";
import { Card, Flex, Button, Modal } from "antd";
import StockModal from "./StockModal";
import { genBoxStyle } from "antd/es/image/style";

const gridStyle = {
  width: "23%",
  margin: "1%",
  padding: "2% 0",
  textAlign: "center",
};

const buttonStyle = { margin: "2% 4%", minWidth: "min-content" };

const gridContainerStyle = {
  padding: "1%",
};

const cardElements = [
  "Add Stock",
  "Remove Stock",
  "Sold Items",
  "Expiring Items",
];

const handleAddStock = () => {};

const CardContainer = () => {
  return (
    <div>
      <Card style={gridContainerStyle}>
        <Flex style={genBoxStyle} align="center" justify="space-between">
          <StockModal element={{ value: "Add Stock" }} type={"add"} />
          <StockModal element={{ value: "Remove Stock" }} type={"remove"} />
          <Card.Grid
            style={gridStyle}
            element={{ value: "Sold Items" }}
            type={"sold"}
          >
            Items Sold
          </Card.Grid>
          <Card.Grid
            style={gridStyle}
            element={{ value: "Expiring Items" }}
            type={"expiry"}
          >
            Expiring Items
          </Card.Grid>
        </Flex>
      </Card>
    </div>
  );
};

export default CardContainer;
