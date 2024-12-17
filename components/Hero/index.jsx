import Image from 'next/image';
import React, { useState } from 'react';
import Modal from './modal';

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col gap-7 relative items-center justify-center pt-16">
      <Image
        className="absolute left-0 top-1"
        alt="floral-design"
        src="floral-design.svg"
        width={150}
        height={150}
      />
      <h1
        className="font-bold text-3xl w-56 text-text text-center border-text border-r-2 border-l-2"
        dir="rtl"
      >
        مراقبت از پوست با تیلدا
        <span className="inline-block align-middle">
          <Image src="Face-Hero.svg" width={36} height={25} alt="face hero" />
        </span>
      </h1>
      <button
        className="bg-first text-main_text py-2 px-4 rounded-xl"
        onClick={toggleModal}
      >
        برای مشاوره کلیک کنید
      </button>

      <div className="w-11/12 bg-first h-[2px] rounded-full"></div>

      {/* Render Modal */}
      {isModalOpen && <Modal onClose={toggleModal} />}
    </div>
  );
}

export default Index;
