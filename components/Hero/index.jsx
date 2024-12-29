import Image from "next/image";
import React, { useState } from "react";
import Modal from "./modal";
import Link from "next/link";


function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col gap-7 relative items-center justify-center pt-12">
      <h1
        className="font-bold text-3xl w-56  text-text text-center border-text border-r-2 border-l-2"
        dir="rtl"
      >
        مراقبت از پوست با تیلدا
        <span className="inline-block align-middle">
          <Image src="Face-Hero.svg" width={36} height={25} alt="face hero" />
        </span>
      </h1>
      <div className="flex items-center justify-center">
        <Link
          dir="rtl"
          href={"/booking"}
          className="bg-accent   text-black rounded-l-xl nav-show py-2 px-2 font-bold border-2 border-first hover:scale-110 focus:scale-110 transition"
        >
         <p  className="text-first animate__animated animate__fadeIn custom-animation animate__infinite">نوبت؟</p>
        </Link>
        <button
          className="bg-first text-main_text py-2 px-4 rounded-r-xl nav-show border-2 border-accent hover:scale-110 focus:scale-110 transition"
          onClick={toggleModal}
        >
          برای مشاوره کلیک کنید
        </button>
      </div>

      <div className="w-11/12 bg-first h-[2px] rounded-full"></div>

      {isModalOpen && <Modal onClose={toggleModal} />}
    </div>
  );
}

export default Index;
