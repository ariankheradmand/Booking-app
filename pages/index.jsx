import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Navbar from "../components/Navbar/index.jsx";
import Hero from "../components/Hero/index.jsx";
import Services from "../components/Services/index.jsx";
import Experiences from "../components/Experience/index.jsx";
import Footer from "../components/Footer/index.jsx";

function Index() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Trigger animation on page load
  }, []);

  return (
    <div className="bg-second">
      <Navbar />
      
    <div className={`bg-second transition-all duration-500 ${show ? "page-enter-active" : "page-enter"}`}>
      
      <Hero />
      <Services />
      <Experiences />
      <Footer />
    </div>
    </div>
  );
}

export default Index;
