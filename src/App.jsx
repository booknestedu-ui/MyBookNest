import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import Countdown from "./components/Countdown";
import ValueProps from "./components/ValueProps";
import EarlyBirdRewards from "./components/EarlyBirdRewards";
import HowItWorks from "./components/HowItWorks";
import Community from "./components/Community";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-brand-bg relative selection:bg-brand-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCategories />
        <Countdown />
        <EarlyBirdRewards />
        <ValueProps />
        <HowItWorks />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

export default App;
