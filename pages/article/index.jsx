import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ArticleBox from "./ArticleBox.jsx";
import Footer from "@/components/Footer";

function Index() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(true); // وقتی صفحه بارگذاری می‌شود انیمیشن اجرا می‌شود
  }, []);

  // تابع برگشت (انجام انیمیشن معکوس و هدایت به صفحه اصلی)
  const handleBack = () => {
    setExit(true);
    setTimeout(() => {
      setShow(false);
      setExit(false);
      router.push("/"); // هدایت به صفحه اصلی بعد از اتمام انیمیشن
    }, 500); // مدت زمان انیمیشن معکوس
  };

  return (
    <div className="relative h-screen">

      <div className="absolute inset-0 bg-second z-0"></div>


      <div
        className={`flex flex-col items-center ${
          exit ? "bg-transparent" : "bg-second"
        } h-screen pt-4 transition-all duration-500 ${
          show && !exit ? "page-enter-active" : "page-enter"
        } z-10`}
      >
        <div className="w-11/12 h-[2px] rounded-full bg-first"></div>
        <div className="flex items-center gap-2 justify-center pt-4">
          <Image src="magazine.svg" width={48} height={48} />
          <h1 className="text-2xl font-bold">مقالات</h1>
        </div>
        
        <ArticleBox />

        <button
          onClick={handleBack}
          className="fixed right-4 mt-4 p-2 bg-first text-white rounded"
        >
          برگشت
        </button>


      </div>
      
    </div>
  );
}

export default Index;
