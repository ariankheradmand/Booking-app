import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackagesBox from './PackagesBox';

function Index() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(true); // Animation plays when the page loads
  }, []);

  // Function for reverse animation and navigation to the home page
  const handleBack = () => {
    setExit(true);
    setTimeout(() => {
      setShow(false);
      setExit(false);
      router.push("/"); // Navigate to home page after animation completes
    }, 500); // Duration of the reverse animation
  };

  return (
    <div className="bg-second ">
      <Navbar />
      <div className={`flex flex-col items-center justify-center mt-4 transition-all dura tion-500 ${show && !exit ? "page-enter-active" : "page-enter"}`}>
        <h2 className='px-4 py-1 border border-black rounded-xl font-extrabold text-2xl '>پکیج ها</h2>
        <PackagesBox />
        <button
          onClick={handleBack}
          className="fixed right-4 top-0 p-2 bg-first text-white rounded"
          aria-label="Go back to homepage"
        >
          برگشت
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Index;