import React, { useEffect, useState } from 'react';

function Modal({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); 
    }, 0); 
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-background') {
      handleClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white rounded-lg p-6 w-96 relative transform transition-transform duration-300 ${
          isVisible
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0' 
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={handleClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">مشاوره رایگان</h2>
        <p className="text-gray-700">لطفا اطلاعات خود را وارد کنید تا با شما تماس بگیریم.</p>
        <form className="mt-4">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="tel"
            placeholder="شماره تماس"
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-first text-main_text py-2 rounded"
          >
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
