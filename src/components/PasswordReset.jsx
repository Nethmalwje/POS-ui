import { Modal } from "antd";
import useForgotPassword from "../hooks/useForgotPassword";
import HourGlass from "./HourGlass";

function PasswordReset({ isPasswordResetClicked, onClick, email }) {
  const { isLoading, handlePasswordReset } = useForgotPassword();

  const handleOk = () => {
    handlePasswordReset(email);
    onClick();
  };
  const handleCancel = () => {
    onClick();
  };

  if (isLoading) {
    return <HourGlass />;
  }

  return (
    <Modal
      title="Send Password Reset Token"
      open={isPasswordResetClicked}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        style: { backgroundColor: "red", borderColor: "red" },
      }}
      centered
    >
      <p>
        Are you sure you want to send the password resend token to this employee
      </p>
    </Modal>
  );
}

export default PasswordReset;
