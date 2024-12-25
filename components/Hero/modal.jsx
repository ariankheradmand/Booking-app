import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import 'animate.css';

function Modal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    "فشیال بارداری",
    "فشیال کلاسیک",
    "لاین مراقبت از بدن",
    "کربوکسی تراپی",
    "فشیال VIP",
    "پاکسازی پوست"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      alert("لطفاً یک گزینه انتخاب کنید.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, selectedOption }),
      });

      if (response.ok) {
        setFeedback("success");
      } else {
        setFeedback("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFeedback("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const renderFeedback = () => {
    if (feedback === "success") {
      return (
        <div className="text-center text-green-700">
          <div className="bg-green-300 border-green-800 border border-dashed px-4">
            <p className="text-sm mt-4 mb-4 border-b border-dashed border-green-800 w-max">
              اطلاعات با موفقیت ارسال شد!
            </p>
            <p className="text-sm mt-4 mb-4 border-b border-dashed border-green-800 w-max">
              به زودی با شما تماس گرفته خواهد شد.
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 bg-first text-main_text py-2 px-4 rounded"
          >
            بستن
          </button>
        </div>
      );
    }

    if (feedback === "error") {
      return (
        <div className="text-red-600">
          <div className="bg-red-300 border-red-800 border border-dashed px-4">
            <p className="text-sm mt-4 mb-4 border-b border-dashed border-red-800 w-max">
              مشکلی پیش آمده لطفا بعدا دوباره تلاش کنید.
            </p>
            <p className="text-sm mt-4 mb-4 border-b border-dashed border-red-800 w-max">
              لطفا از استفاده شمارگان فارسی پرهیز نمایید.
            </p>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="mt-4 bg-first text-main_text py-2 px-4 rounded"
          >
            بازگشت
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target.id === "modal-background" && onClose()}
    >
      <div id="modal-background" className="bg-white rounded-lg p-6 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">مشاوره رایگان</h2>
        {feedback ? (
          renderFeedback()
        ) : (
          <>
            <p className="text-gray-700 mb-4">لطفا اطلاعات خود را وارد کنید:</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="w-full p-2 mb-4 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                minLength={11}
                maxLength={11}
                dir="rtl"
                type="tel"
                placeholder="شماره تماس"
                className="w-full p-2 mb-4 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div> لطفا فیلد مورد نظر برای مشاوره را انتخاب نمایید </div>
              <div
                className="relative w-full p-2 mb-4 border rounded cursor-pointer  border-second bg-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="animate__animated animate__fadeIn">{selectedOption || "لطفاً انتخاب کنید"}</div>
                <div
                  className={`absolute top-full left-0 w-full bg-white border rounded mt-1 animate__animated animate__fadeIn border-second ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer animate__animated animate__fadeInUp border-b border-second"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm mb-4 border-b border-dashed border-black w-max">
                لطفا از کلمات فارسی برای نام و نام خانودگی استفاده کنید
              </div>
              <div className="text-sm mt-4 mb-4 border-b border-dashed border-black w-max">
                لطفا از شمارگان لاتین استفاده کنید
              </div>
              <button
                type="submit"
                className="w-full bg-first text-main_text py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? (
                  <HashLoader color="white" size={20} />
                ) : (
                  "ارسال"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
