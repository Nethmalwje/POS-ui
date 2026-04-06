import React, { useEffect, useState } from "react";
import "../login.css";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="h-full md:h-svh bg-contain bg-neutral-200 dark:bg-neutral-700 items-center justify-center"
      style={{
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
        backgroundImage: "linear-gradient(to right, #0000ff, #00ffff)",
      }}
    >
      <div className="container mx-auto h-full p-10 items-center justify-center fadeInAnimation">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="block rounded-3xl bg-blue-50 shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
              <div className="md:mx-6 md:p-12">
                <div className="text-center">
                  <img className="mx-auto w-36" src="SmartPOS.png" alt="logo" />
                </div>
                <div className="mt-6">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
