import React from "react";
import Image from "next/image";

import CallToAction from "./components/call-to-action";
import BgLoginPage from "@/public/images/bg-login-page.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full flex-1 overflow-hidden pt-14 flex flex-col justify-center items-center">
      <CallToAction />

      <div className="w-full flex-1 md:grid md:grid-cols-2 justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex flex-col items-center w-fit mx-auto">
            <div className="bg-neutral-400/20 w-[80%] h-4 rounded-t-3xl"></div>
            <div className="bg-neutral-400/40 w-[90%] h-4 rounded-t-3xl"></div>
            {children}
          </div>
        </div>

        <div className="hidden md:block w-full h-full relative z-0 pt-8">
          <Image
            src={BgLoginPage}
            alt="Login page image"
            className="hidden md:block object-cover absolute inset-0 w-full h-full right-[-100px] rounded-t-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
