import { useUserData } from "../context/userContext";
import AnimatedGraph from "./AnimatedGraph";
import PasswordInput from "./PasswordInput";

function SecondLogin({ isValidated }) {
  const { email, role } = useUserData();
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-cover bg-center">
      <div
        className={`bg-white bg-opacity-90 ${
          role === "Cashier" ? "mr-44" : null
        } p-10 rounded-2xl shadow-2xl lg:w-1/3 w-4/5 mb-8 lg:mb-0 flex flex-col items-center lg:ml-48 animate-fadeIn`}
      >
        <div className="text-center mb-6">
          <img
            className="mx-auto w-36"
            src="SmartPOS.png"
            alt="SmartPOS Logo"
          />
        </div>
        <div className="w-full">
          <PasswordInput email={email} role={role} isValidated={isValidated} />
        </div>
      </div>

      {/* Right side - POS Animation (only visible on large screens) */}
      {role !== "Cashier" && (
        <div className="hidden lg:flex lg:w-1/2 w-full justify-center items-center ml-auto mt-8 animate-fadeIn">
          <AnimatedGraph />
        </div>
      )}
    </div>
  );
}

export default SecondLogin;
