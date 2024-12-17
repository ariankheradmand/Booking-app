
import "../app/globals.css";
import Navbar from "../components/Navbar/index.jsx";
import Hero from "../components/Hero/index.jsx";
import Services from "../components/Services/index.jsx";

function index() {
  return (
    <div className="bg-second h-screen">
      <Navbar/>
      <Hero/>
      <Services/>
    </div>
  );
}

export default index;
