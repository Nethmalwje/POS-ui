import { useEffect, useState } from "react";
import AnimatedGraph from "./AnimatedGraph";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import PosAnimation from "./POSAnimation";

function LoginComponent({ isValidated, role, email }) {
  const [stage, setStage] = useState("email");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(isValidated ? "password" : "email");
      setIsTransitioning(false);
    }, 700);
  }, [isValidated]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full transition-all duration-700">
      {/* Left side (Email/Password Component) */}
      <div
        className={`bg-white bg-opacity-90 p-8 lg:p-10 rounded-2xl shadow-2xl lg:w-1/3 w-11/12 md:w-4/5 mb-8 lg:mb-0 flex flex-col items-center lg:ml-48 transition-all duration-700 transform ${
          isTransitioning
            ? "translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <div className="text-center mb-6">
          <img
            className="mx-auto w-32 lg:w-36"
            src="SmartPOS.png"
            alt="SmartPOS Logo"
          />
        </div>
        <div className="w-full">
          {stage === "email" ? (
            <EmailInput isValidated={isValidated} />
          ) : (
            <PasswordInput
              isValidated={isValidated}
              role={role}
              email={email}
            />
          )}
        </div>
      </div>

      {/* Right side (PosAnimation/AnimatedGraph Component) */}

      <div
        className={`hidden lg:flex lg:w-1/2 w-full justify-center items-center ml-auto mt-8 transition-all duration-700 transform ${
          isTransitioning
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {stage === "email" ? <PosAnimation /> : <AnimatedGraph role={role} />}
      </div>
    </div>
  );
}

export default LoginComponent;
