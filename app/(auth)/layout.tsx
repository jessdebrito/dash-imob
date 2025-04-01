import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import BgLoginPage from "@/public/images/bg-login-page3.jpg";

import BgGradiant from "@/public/images/hypercolor-gradient.jpeg";

import DashLogo from "@/public/images/favicon.ico";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full h-full md:p-10  flex items-center justify-center bg-neutral-200">
       {/* <Image
        src={BgGradiant}
        alt="Login page image"
        className="absolute inset-0 w-full h-full object-cover animate-pulse-slow"
        priority
      /> */}
    
        <div className="grid md:grid-cols-2 h-full md:w-full md:h-full ">
          {/* Imagem (escondida no mobile) */}
          <div className="relative hidden md:block h-full ">
            <Image
              src={BgLoginPage}
              alt="Login page image"
              className="absolute inset-0 w-full h-full object-cover animate-pulse-slow "
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-neutral-600 to-emerald-300 opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div className="text-3xl font-bold">Boas vindas ao Genie!</div>
              <div className="max-w-xs">
                <p className="text-white/80 mb-4">
                  "O gênio que administra a sua loja de forma segura e rápida."
                </p>
                <p className="text-white/60 text-sm">— John Doe</p>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="backdrop-blur-sm py-4 sm:p-8 md:mt-26 flex flex-col items-center max-w-sm mx-auto">
            {/* Imagem para mobile */}
            <div className="md:hidden w-full h-60 sm:h-60 rounded-xl mb-3 bg-cover bg-center relative overflow-hidden">
              <Image
                src={BgLoginPage}
                alt="Login page image"
                className="absolute  inset-0 w-full h-full object-cover animate-pulse-slow"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 via-neutral-600 to-emerald-300 opacity-50">
                <h2 className="text-2xl font-bold text-white text-center">
                Boas vindas ao Genie!
                </h2>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
  );
};

export default AuthLayout;
