import type { Metadata } from "next";
import React from "react";
import Hero from "../components/Landing/Hero/HeroSection";
import WhatIsPromet from "../components/Landing/Sobre/sobre";

export const metadata: Metadata = {
  title:
    "Promet",
  description: "",
};

export default function Home() {
  return (
<div className="">
  <div>
    <Hero />
  </div>
  <div>
    <WhatIsPromet />
  </div>
</div>
  );
}
