import {
  KeyOutlined,
  LoadingOutlined,
  LoginOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useUserData } from "../context/userContext";

function Step({ isValidated }) {
  const { email } = useUserData();

  return (
    <div className="w-full mx-auto flex flex-row items-center justify-center">
      <Steps
        direction="horizontal"
        responsive
        items={[
          {
            title: "Email",
            status: !isValidated ? "process" : "finish",
            icon: <MailOutlined />,
          },
          {
            title: "Password",
            status: email !== "" ? "process" : "wait",
            icon: <KeyOutlined />,
          },
          {
            title: "Logged In",
            status: "wait",
            icon: <LoginOutlined />,
          },
        ]}
      />
    </div>
  );
}

export default Step;
