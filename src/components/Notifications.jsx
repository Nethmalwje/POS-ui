import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";

function Notifications() {
  return (
    <Badge dot>
      <BellOutlined style={{ fontSize: "24px" }} />
    </Badge>
  );
}

export default Notifications;
