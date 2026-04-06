import { Flex, theme } from "antd";
import CompactCard from "./CompactCard";

function InventoryInfo() {
  const userData = {
    employee_id: 12,
    name: "Yapa",
    role: "Store Manager",
    location_id: 1,
    location: "Gampaha",
  };

  return (
    <div className="py-0">
      <Flex className="py-0" justify="space-between" align="center">
        <CompactCard location={userData.location} />
      </Flex>
    </div>
  );
}

export default InventoryInfo;
