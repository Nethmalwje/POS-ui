import { Alert, Button } from "antd";
import { useAction } from "../context/actionContext";
import { useNavigate } from "react-router-dom";

function PasswordAlert({ visible, temporary, setVisible }) {
  const { setPasswordUpdateClicked } = useAction(false);
  const navigate = useNavigate();

  function handleUpdateClick() {
    setPasswordUpdateClicked(true);
    navigate("/view");
    setVisible(false);
  }
  return (
    <div>
      {temporary && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {visible && (
            <Alert
              className="custom-alert max-w-lg w-full font-poppins font-semibold"
              message="Warning"
              description={
                <div className="flex flex-col items-center">
                  You are using the default password. Make sure to update your
                  password.
                  <div className="mt-2">
                    <Button
                      className="font-normal bg-orange-400 text-white rounded"
                      onClick={handleUpdateClick}
                    >
                      Update Now
                    </Button>
                  </div>
                </div>
              }
              type="warning"
              showIcon
              closable
            />
          )}
          <style jsx="true">{`
            .custom-alert .ant-alert-message {
              color: orange;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default PasswordAlert;
