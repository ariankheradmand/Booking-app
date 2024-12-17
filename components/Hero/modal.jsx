import React, { useState } from "react";

function Modal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState(null); // حالت جدید برای بازخورد

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // اطلاعات را به ربات تلگرام ارسال کنید
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      if (response.ok) {
        setFeedback("success");
      } else {
        setFeedback("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFeedback("error");
    }
  };

  const renderFeedback = () => {
    if (feedback === "success") {
      return (
        <div className="text-center text-green-600">
          <p>اطلاعات با موفقیت ارسال شد!</p>
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
        <div className="text-center text-red-600">
          <p>ارسال اطلاعات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.</p>
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
      <div
        id="modal-background"
        className="bg-white rounded-lg p-6 w-96 relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">مشاوره رایگان</h2>
        {feedback ? (
          renderFeedback() // نمایش بازخورد
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
                dir="rtl"
                type="tel"
                placeholder="شماره تماس"
                className="w-full p-2 mb-4 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="text-sm  border-b border-dashed border-black w-max">لطفا از کلمات فارسی برای نام و نام  خانودگی استفاده کنید</div>
              <div className="text-sm mt-4 mb-4 border-b border-dashed border-black w-max">لطفا از شمارگان لاتین استفاده کنید</div>
             
              <button
                type="submit"
                className="w-full bg-first text-main_text py-2 rounded"
              >
                ارسال
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
