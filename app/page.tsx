import type { Metadata } from "next";
import React from "react";
import Hero from "../components/Landing/Hero/HeroSection";

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
</div>
  );
}
