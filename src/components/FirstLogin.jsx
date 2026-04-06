import EmailInput from "./EmailInput";
import PosAnimation from "./POSAnimation";

function FirstLogin({ isValidated }) {
  return (
    <>
      <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl lg:w-1/3 w-4/5 mb-8 lg:mb-0 flex flex-col items-center lg:ml-48 animate-fadeIn">
        <div className="text-center mb-6">
          <img
            className="mx-auto w-36"
            src="SmartPOS.png"
            alt="SmartPOS Logo"
          />
        </div>
        <div className="w-full">
          <EmailInput isValidated={isValidated} />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 w-full justify-center items-center ml-auto mt-8 animate-fadeIn">
        <PosAnimation />
      </div>
    </>
  );
}

export default FirstLogin;
