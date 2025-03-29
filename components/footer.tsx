import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-neutral-200/10 p-4 text-center w-full text-sm">
      <p>
        &copy; 2025, desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/jessica-de-brito/"
          className=" hover:bold hover:text-blue-400"
        >
          {" "}
          Jéssica de Brito
        </a>{" "}
        - Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
