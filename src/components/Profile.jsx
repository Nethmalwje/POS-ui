import { Dropdown } from "antd";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import HourGlass from "./HourGlass";
import {
  ArrowDownOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Profile() {
  const navigate = useNavigate();
  const { isLoading: isLoggingout, handleLogoutUser } = useLogout();
  const items = [
    {
      key: "1",
      label: (
        <span
          className="font-poppins font-semibold p-2"
          onClick={() => navigate("/view")}
        >
          <UserOutlined style={{ marginRight: "4px" }} />{" "}
          <strong>My Profile</strong>
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          className="font-poppins font-semibold p-2"
          onClick={handleLogoutUser}
        >
          <LogoutOutlined style={{ marginRight: "4px" }} />{" "}
          <strong>Log Out</strong>
        </span>
      ),
    },
  ];

  if (isLoggingout) {
    return <HourGlass />;
  }

  return (
    <Dropdown
      autoFocus
      overlayClassName="absolute right-0"
      menu={{
        items,
      }}
      placement="bottomRight"
    >
      <button className="flex flex-row items-center justify-between">
        <UserHeader />
        <CaretDownOutlined />
      </button>
    </Dropdown>
  );
}

export default Profile;
