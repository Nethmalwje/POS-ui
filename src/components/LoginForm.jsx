import { TERipple } from "tw-elements-react";
import Icon from "./Icon";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, handleLogin } = useLogin();

  function onSubmit(data) {
    handleLogin(data);
  }

  function onError(errors) {
    for (const [key, value] of Object.entries(errors)) {
      toast.error(value.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <p className="mb-4 font-poppins font-medium text-center">
          Enter your email and password
        </p>
        {/* <!--Email input--> */}
        <div className="flex flex-col items-end gap-6 w-full md:w-72">
          <div className="w-full space-y-3">
            <div className="relative">
              <input
                type="email"
                id="email"
                className="peer font-poppins py-3 px-4 pl-11 block w-full bg-blue-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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

        {/* <!--Password input--> */}
        <div className="flex flex-col items-end gap-6 w-full md:w-72 mt-4">
          <div className="w-full space-y-3">
            <div className="relative">
              <input
                type="password"
                id="password"
                className="peer font-poppins py-3 px-4 pl-11 block w-full bg-blue-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
        <div className="mb-12 pb-1 pt-1 text-center md:w-72 mt-4">
          <TERipple rippleColor="light" className="w-full">
            <button
              className="font-poppins mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="submit"
              style={{
                background:
                  "linear-gradient(to right, #007bff, #0056b3, #004085, #002752)",
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </TERipple>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
