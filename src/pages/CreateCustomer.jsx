import UserForm from "../components/UserForm";
import { theme } from "antd";

function CreateCustomer() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      className="p-6 min-h-[360px] ml-1"
      style={{
        background: `linear-gradient(150deg, #ffffff, #ffffff)`,
        borderRadius: borderRadiusLG,
      }}
    >
      <UserForm isLoggedUser={false} />
    </div>
  );
}

export default CreateCustomer;
