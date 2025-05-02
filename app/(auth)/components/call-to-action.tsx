"use client"
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const phrases = [
    "campanhas...",
    "catálogos...",
    "design...",
    "vendas...",
  ];

  const [currentPhrase, setCurrentPhrase] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const fullPhrase = phrases[phraseIndex];

      setCurrentPhrase((prev) =>
        isDeleting
          ? fullPhrase.substring(0, prev.length - 1)
          : fullPhrase.substring(0, prev.length + 1)
      );
      setCurrentIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && currentPhrase === fullPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      }
      else if (isDeleting && currentPhrase === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };
    const typingSpeed = isDeleting ? 30 : 70;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentPhrase, isDeleting, phraseIndex, currentIndex, phrases]);

  return (
    <div className="p-6">
      <h1 className="text-4xl">
        Nunca foi tão <i>tranquilo</i> gerenciar e-commerces.
      </h1>
      <h2 className="text-2xl">Plataforma de gerenciamento multi-loja.</h2>

      <Button variant={"ghost"} className="min-w-1/3 hover:bg-transparent border-1 rounded-3xl text-lg mt-2 font-light">
      Gerencie {currentPhrase}
      </Button>
    </div>
  );
};

export default CallToAction;
