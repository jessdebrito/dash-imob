import React from "react";
import Image from "next/image";

import BgLoginPage from "@/public/images/bg-login-page.png";
import CallToAction from "./(routes)/components/call-to-action";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full h-screen overflow-hidden py-6 bg-neutral-800/10 flex flex-col justify-center items-center">
      <CallToAction />

      <div className="w-full h-full grid grid-cols-2 justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="bg-white/50 md:w-[42%] w-[80%] h-4 rounded-t-3xl"></div>
          <div className="bg-white/80 md:w-[48%] w-[89%] h-4 rounded-t-3xl"></div>
          {children}
        </div>

        <div className="hidden md:block w-full h-full relative z-0 py-8">
          <Image
            src={BgLoginPage}
            alt="Login page image"
            className="
          object-cover absolute w-full right-[-100px] top-1/2 -translate-y-1/2 rounded-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
