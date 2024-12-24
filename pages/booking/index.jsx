import "../../app/globals.css";
import Booking from "./booking";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AppointmentForm() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(true); // Trigger animation on page load
  }, []);

  const handleBack = () => {
    setExit(true);
    setTimeout(() => {
      setShow(false);
      setExit(false);
      router.push("/"); // هدایت به صفحه اصلی بعد از اتمام انیمیشن
    }, 500); // مدت زمان انیمیشن معکوس
  };

  return (
    <div className="bg-second ">
      <Navbar />
      <div
        className={`flex flex-col items-center mt-20 ${
          exit ? "bg-transparent" : "bg-second"
        } pt-4 transition-all duration-500 ${
          show && !exit ? "page-enter-active" : "page-enter"
        } z-10`}
      >
        <button
          onClick={handleBack}
          className="fixed right-4 -top-16 p-2 z-50 bg-first text-white rounded"
        >
          برگشت
        </button>
        <Booking />
      </div>
      <Footer />
    </div>
  );
}
