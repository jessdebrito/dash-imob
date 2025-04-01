import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoGenie from "@/public/images/genie.png";

const Footer = () => {
  return (
    <footer className="bg-neutral-200/10 px-12 py-12 min-w-full border-t">
      <div className="mb-8">
        <Link href="/">
          <Image
            src={LogoGenie}
            alt="Logo Gênio de pele azul e braços cruzados"
            className="w-20"
          />
          <h2 className="self-center text-3xl font-semibold whitespace-nowrap">
            GENIE | Dashboard e CMS
          </h2>
        </Link>
        <p className="max-w-2xl">
          Facilitador de gerenciamento de e-commerce. No Genie é possível criar
          e administrar campanhas, estoque, detalhes de produtos e mais.
          Acompanhar a listagem de compras de seus clientes em tempo real.
        </p>

      </div>

      <div className="border-t border-gray-300 pt-4 w-full flex flex-row justify-between text-sm">
        <p className="mb-1">All Rights Reserved © 2025</p>
        <p>
          Desenvolvido por{" "}
          <a href="https://github.com/jessdebrito" className="underline">
            Jéssica de Brito
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
