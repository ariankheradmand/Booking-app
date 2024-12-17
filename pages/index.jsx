
import "../app/globals.css";
import Navbar from "../components/Navbar/index.jsx";
import Hero from "../components/Hero/index.jsx";
import Services from "../components/Services/index.jsx";
import Experiences from "../components/Experience/index.jsx";
import Fotter from "../components/Fotter/index.jsx";

function index() {
  return (
    <div className="bg-second ">
      <Navbar/>
      <Hero/>
      <Services/>
      <Experiences/>
      <Fotter/>
    </div>
  );
}

export default index;
