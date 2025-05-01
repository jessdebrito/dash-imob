import React from "react";
import Image from "next/image";

import CallToAction from "./components/call-to-action";
import BgLoginPage from "@/public/images/bg-login-page.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full h-full overflow-hidden py-8 flex flex-col justify-center items-center">
      <CallToAction />

      <div className="w-full h-full md:grid md:grid-cols-2 justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="bg-neutral-400/20 md:w-[42%] w-[76%] h-4 rounded-t-3xl"></div>
          <div className="bg-neutral-400/40 md:w-[48%] w-[85%] h-4 rounded-t-3xl"></div>
          {children}
        </div>

        <div className="hidden md:block w-full h-full relative z-0 py-8">
          <Image
            src={BgLoginPage}
            alt="Login page image"
            className=" hidden md:block object-cover absolute w-full right-[-100px] top-1/2 -translate-y-1/2 rounded-2xl shadow-2xl" 
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
