import Image from "next/image.js";
import "../app/globals.css";
import Navbar from "../components/Navbar/index.jsx";
import Hero from "../components/Hero/index.jsx";
import Services from "../components/Services/index.jsx";

function index() {
  return (
    <div className="">
      <Image src="/main-bg.svg" className="absolute -z-10" layout="fill" objectFit="cover" />
      <Navbar/>
      <Hero/>
      <Services/>
    </div>
  );
}

export default index;
