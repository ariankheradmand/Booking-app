import React, { useState, useRef, useEffect } from "react";
import "../../app/globals.css";
import Experience from "@/components/Experience";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";

const main_data =
  "پاکسازی پوست با حذف آلودگی‌ها، چربی اضافی و سلول‌های مرده، به شفافیت و سلامت پوست کمک می‌کند. این کار از انسداد منافذ، بروز جوش و پیری زودرس جلوگیری کرده و جذب بهتر محصولات مراقبتی را ممکن می‌سازد. پاکسازی منظم، پوست را شاداب و جوان نگه می‌دارد.";
const shortedData =
  "پاکسازی پوست با حذف آلودگی‌ها، چربی اضافی و سلول‌های مرده، به شفافیت و سلامت پوست کمک می‌کند...";

function Index() {
  const [data, setData] = useState(shortedData);
  const [rotate, setRotate] = useState(180);
  const [height, setHeight] = useState("auto");
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const contentRef = useRef(null);
  const router = useRouter();

  const changingData = () => {
    if (data === shortedData) {
      setData(main_data);
      setRotate(0);
    } else {
      setData(shortedData);
      setRotate(180);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight + 80}px`);
    }
  }, [data]);

  useEffect(() => {
    setShow(true); // Animation plays when the page loads
  }, []);

  const handleBack = () => {
    setExit(true);
    setTimeout(() => {
      setShow(false);
      setExit(false);
      router.push("/"); // Navigate to home page after animation completes
    }, 500); // Duration of the reverse animation
  };

  return (
    <div className="bg-second">
      <Navbar />
      <div
        className={`flex flex-col items-center bg-second h-screen transition-all duration-500 mt-4 ${
          show && !exit ? "page-enter-active" : "page-enter"
        }`}
      >
        <div className="mt-4">
          <Experience />
        </div>
        <div className="border-first w-11/12 h-px border"></div>
        <div className="flex items-center mt-4 relative w-max">
          <Image
            className="absolute -left-10"
            alt="SkinCare-Logo"
            src="skincare.svg"
            width={45}
            height={35}
          />
          <h2 className="text-xl font-bold">پاکسازی </h2>
        </div>
        <div className="flex items-center justify-center w-full">
          <div
            onClick={changingData}
            dir="rtl"
            className="flex flex-col items-center justify-center py-1 px-4 mt-4 rounded-lg bg-third w-10/12 transition-all duration-500 overflow-hidden"
            style={{ height }}
          >
            <h3 className=" pb-4">چرا پاکسازی پوست ؟</h3>
            <h4 className="text-xs opacity-80" ref={contentRef}>
              {data}
            </h4>
            <Image
              className={`transition-transform duration-500 mt-1`}
              style={{ transform: `rotate(${rotate}deg)` }}
              src={"SkinCleaningArrow.svg"}
              width={18}
              height={10}
            />
          </div>
        </div>
        <div className="flex items-center justify-center pb-6 w-9/12 border-dashed border-white border-b-2">
          <button className="mt-6 bg-first text-white px-2 py-px rounded-lg border-white border">
            برای رزرو وقت کلیک کنید
          </button>
        </div>
        <button
          onClick={handleBack}
          className="fixed right-4 top-4 p-2 bg-first text-white rounded"
          aria-label="Go back to homepage"
        >
          برگشت
        </button>
      </div>
    </div>
  );
}

export default Index;
