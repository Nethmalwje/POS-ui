import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAction } from "../context/actionContext";

function NightModeButton() {
  const { isNightModeOn, toggleNightMode } = useAction();

  return (
    <>
      {isNightModeOn ? (
        <MoonOutlined style={{ fontSize: "24px" }} onClick={toggleNightMode} />
      ) : (
        <SunOutlined style={{ fontSize: "24px" }} onClick={toggleNightMode} />
      )}
    </>
  );
}

export default NightModeButton;
