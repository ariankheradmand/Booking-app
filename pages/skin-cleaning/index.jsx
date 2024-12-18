import React, { useState, useRef, useEffect } from "react";
import "../../app/globals.css";
import Experience from "@/components/Experience";
import Image from "next/image";

const main_data =
  "پاکسازی پوست با حذف آلودگی‌ها، چربی اضافی و سلول‌های مرده، به شفافیت و سلامت پوست کمک می‌کند. این کار از انسداد منافذ، بروز جوش و پیری زودرس جلوگیری کرده و جذب بهتر محصولات مراقبتی را ممکن می‌سازد. پاکسازی منظم، پوست را شاداب و جوان نگه می‌دارد.";
const shortedData =
  "پاکسازی پوست با حذف آلودگی‌ها، چربی اضافی و سلول‌های مرده، به شفافیت و سلامت پوست کمک می‌کند.";

function Index() {
  const [data, setData] = useState(shortedData);
  const [rotate, setRotate] = useState(0);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);

  const changingData = () => {
    if (data === shortedData) {
      setData(main_data);
      setRotate(180);
    } else {
      setData(shortedData);
      setRotate(0);
    }
  };

  useEffect(() => {
    // Dynamically calculate the height based on content
    if (contentRef.current) {
      setHeight(`${(contentRef.current.scrollHeight) + 80}px`);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center bg-second h-screen">
      <div className="pt-4">
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
    </div>
  );
}

export default Index;
