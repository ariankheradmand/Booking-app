import "../../app/globals.css";
import Booking from "./booking";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppointmentForm() {

  return (
    <div className="bg-second ">
      <Navbar />
   <div className="flex flex-col items-center justify-start mt-20 bg-second ">
  
  <Booking />
 </div>
 <Footer />
 </div>
  );
}