import type { Metadata } from "next";
import Hero2 from "../components/Landing/Hero2/HeroSection";
import WhatIsPromet from "../components/Landing/Sobre/sobre";
import TrainingAreas from "../components/Landing/Areas/areasdeFormacao";
import PartnersSection from "../components/Landing/Partners/Partnes";
import HowItWorks from "../components/Landing/ComoFunciona/comoFunciona";
import HowItWorksButton from "../components/Landing/ComoFunciona/comoFuncionaButton";
import Beneficios from "../components/Landing/Beneficios/beneficio";

export const metadata: Metadata = {
  title: "Promet",
  description: "",
};

export default function Home() {

  return (
    <div>
      <div>
        <Hero2 />
      </div>
      <div>
        <WhatIsPromet />
      </div>
      <div>
        <TrainingAreas />
      </div>
      <div>
        <PartnersSection />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <HowItWorksButton />
      </div>
      <div>
        <Beneficios />
      </div>
    </div>
  );
}
