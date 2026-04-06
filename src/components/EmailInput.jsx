import { TERipple } from "tw-elements-react";
import Icon from "./Icon";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAccess from "../hooks/useAccess";
import Step from "./Steps";
import { useEffect, useRef } from "react";

function EmailInput({ isValidated }) {
  useEffect(() => {
    const emailInput = document.getElementById("email");
    emailInput.focus();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, handleAccess } = useAccess();

  function onSubmit(data) {
    handleAccess(data);
  }

  function onError(errors) {
    for (const [key, value] of Object.entries(errors)) {
      toast.error(value.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 font-poppins font-medium text-center">
            Enter your email address to proceed
          </p>
          {/* <!--Email input--> */}
          <div className="flex flex-col items-center justify-center gap-6 w-full md:w-72">
            <div className="w-full space-y-3">
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  className="peer font-poppins py-3 px-4 pl-11 block w-full bg-blue-200 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter email address"
                  disabled={isLoading}
                  {...register("email", {
                    required: "Please enter your email address",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                <Icon
                  path={
                    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  }
                >
                  <polyline points="22,6 12,13 2,6"></polyline>
                </Icon>
              </div>
            </div>
          </div>

          {/* <!--Submit button--> */}
          <div className="mb-8 pb-1 pt-1 text-center md:w-72 mt-4 w-full">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="font-poppins inline-block w-full rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="submit"
                style={{
                  background:
                    "linear-gradient(to right, #007bff, #0056b3, #004085, #002752)",
                }}
              >
                {isLoading ? "Validating..." : "Proceed"}
              </button>
            </TERipple>
          </div>
        </div>
      </form>
      <Step isValidated={isValidated} />
    </div>
  );
}

export default EmailInput;
