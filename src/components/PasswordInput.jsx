import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
import Step from "./Steps";
import Icon from "./Icon";
import { TERipple } from "tw-elements-react";
import { useUserData } from "../context/userContext";

function PasswordInput({ email, role, isValidated }) {
  useEffect(() => {
    const passordInput = document.getElementById("password");
    passordInput.focus();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, handleLogin } = useLogin();
  const { handleEmailChange, handleRoleChange } = useUserData();

  function onSubmit(data) {
    if (email) {
      const newData = { ...data, email };
      handleLogin(newData);
    }
  }

  function handleBackButton() {
    handleRoleChange("");
    handleEmailChange("");
  }

  function onError(errors) {
    for (const [key, value] of Object.entries(errors)) {
      toast.error(value.message);
    }
  }

  const isManager = role !== "Cashier";
  const buttonColor = isManager
    ? "linear-gradient(to right, #004085, #002752)"
    : "linear-gradient(to right, #007bff, #0056b3)";

  const greetingText = isManager ? "Manager Portal Access" : "Cashier Access";

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col w-full items-center justify-center">
            <p className="mb-2 font-poppins text-xl text-center text-blue-700 font-bold">
              {greetingText}
            </p>
            <p className="mb-4 font-poppins font-medium text-center">
              Enter your password
            </p>
            <div className="flex flex-col justify-center items-center gap-3 w-full md:w-72 mt-4">
              <div className="w-full space-y-3">
                <div className="relative w-full">
                  <input
                    type="password"
                    id="password"
                    className="peer  font-poppins py-3 px-4 pl-11 block w-full bg-blue-200 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Enter password"
                    disabled={isLoading}
                    {...register("password", {
                      required: "Please enter your password",
                    })}
                  />
                  <Icon
                    path={
                      "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"
                    }
                  >
                    <circle cx="16.5" cy="7.5" r=".5"></circle>
                  </Icon>
                </div>
              </div>
            </div>

            {/* <!--Submit button--> */}
            <div className="pb-1 pt-1 text-center md:w-72 w-full mt-6 flex flex-col items-center justify-between gap-y-2">
              <TERipple rippleColor="light" className="w-full">
                <button
                  className="font-poppins inline-block w-full rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  type="submit"
                  style={{ background: buttonColor }}
                >
                  {isLoading ? "Validating..." : "Login"}
                </button>
              </TERipple>
            </div>
          </div>
        </form>
        <div className="pb-1 mb-6 pt-1 text-center md:w-72 w-full flex flex-col items-center justify-between">
          <button
            className="font-poppins inline-block w-full rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            style={{ background: buttonColor }}
            onClick={handleBackButton}
          >
            Back
          </button>
        </div>
      </div>
      <Step isValidated={isValidated} />
    </div>
  );
}

export default PasswordInput;
