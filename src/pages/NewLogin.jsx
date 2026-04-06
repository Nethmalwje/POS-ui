import { useEffect, useState } from "react";
import { useUserData } from "../context/userContext";
import LoginComponent from "../components/LoginComponent";

function NewLogin() {
  const { email, role } = useUserData();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (email !== "" && role !== "") {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [email, role]);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <img
        src="/background.svg"
        alt="background"
        className="absolute z-0 w-full h-full object-cover"
      />

      <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full relative z-30 p-4 lg:p-0">
        <LoginComponent isValidated={isValidated} role={role} email={email} />
      </div>
    </div>
  );
}

export default NewLogin;
