import React, { useState } from "react";

function Modal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
        alert("اطلاعات با موفقیت ارسال شد!");
        onClose();
      } else {
        alert("ارسال اطلاعات با مشکل مواجه شد.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("خطایی رخ داده است.");
    }
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
