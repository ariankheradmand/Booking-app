import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

const daysOfWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];
const hours = Array.from({ length: 14 }, (_, i) => `${i + 7}:00`);

function Booking() {
  const [filterAppointments, setFilterAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [availableHours, setAvailableHours] = useState(hours);
  const [formData, setFormData] = useState({
    name: "",
    weeks: "",
    hours: "",
    service: "",
    phoneNumber: "09", // Default start with '09'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  // Fetch appointments data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/appointments/secret");
        const data = await response.json();
        setFilterAppointments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update available hours based on selected day
  useEffect(() => {
    if (selectedDay) {
      const reservedHours = filterAppointments
        .filter((appointment) => appointment.weeks === selectedDay)
        .map((appointment) => appointment.hours);

      setAvailableHours(hours.filter((hour) => !reservedHours.includes(hour)));
    } else {
      setAvailableHours(hours);
    }
  }, [selectedDay, filterAppointments]);

  // Handle input changes for form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      let phoneValue = value.replace("09", ""); // Remove '09' to check new input
      if (/^\d*$/.test(phoneValue)) {
        // Test if it's only digits
        setFormData((prev) => ({
          ...prev,
          [name]: "09" + phoneValue.slice(0, 9), // Ensure '09' at start, and max length after is 9
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const { name, weeks, hours, service, phoneNumber } = formData;
    return name && weeks && hours && service && phoneNumber.length === 11;
  };

  // Handle form submission and refresh appointment data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("لطفا همه فیلدها را پر کنید.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/appointments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setConfirmationMessage("نوبت با موفقیت ایجاد شد!");
        console.log(result);
        // Reset form after successful submission
        setFormData({
          name: "",
          weeks: "",
          hours: "",
          service: "",
          phoneNumber: "09",
        });

        // Fetch updated data
        const newDataResponse = await fetch("/api/appointments/get");
        const newData = await newDataResponse.json();
        setFilterAppointments(newData);
      } else {
        alert("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      // Clear the confirmation message after some time if needed
      setTimeout(() => setConfirmationMessage(null), 5000);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mb-3">
      <form
        dir="rtl"
        className="flex flex-col border p-4 rounded-lg gap-3 bg-accent w-11/12 relative nav-show"
        onSubmit={handleSubmit}
      >
        <Image src="flower.svg" width={25} height={25} />
        <Image
          className="absolute left-0 top-0"
          src="/sakura.svg"
          width={40}
          height={25}
        />
        <Image
          className="absolute left-0 bottom-0"
          src="/sakura.svg"
          width={40}
          height={25}
        />
        <Image
          className="absolute right-0 top-40"
          src="/sakura.svg"
          width={40}
          height={25}
        />

        {isLoading && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center rounded-xl nav-show bg-black bg-opacity-70">
            <SyncLoader
              color="#ffffff"
              cssOverride={{}}
              loading
              margin={2}
              speedMultiplier={1}
            />
          </div>
        )}

        <h2 className="text-md">
          لطفا فرم زیر را جهت رزرو نوبت با دقت پر کنید
        </h2>

        <input
          className="px-4 py-2 bg-black/30 text-black placeholder:text-black/60 rounded-xl border-second border-2"
          placeholder="نام"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          onPaste={handleInputChange}
        />
        <span className="text-sm border-b border-black border-dashed w-max">
          شماره همراه خود را وارد کنید:
        </span>
        <input
          dir="ltr"
          minLength={11}
          maxLength={11}
          className="px-4 py-2 z-30 bg-black/30 text-black rounded-xl placeholder:text-black/60 border-second border-2"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          onPaste={handleInputChange}
        />

        <select
          className="px-4 py-2 z-30 bg-black/30 text-black rounded-xl border-second border-2"
          name="weeks"
          value={formData.weeks}
          onChange={(e) => {
            handleInputChange(e);
            setSelectedDay(e.target.value);
          }}
        >
          <option value="">روز هفته</option>
          {daysOfWeek.map((day, i) => (
            <option key={i} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 bg-black/30 text-black rounded-xl border-second border-2"
          name="hours"
          value={formData.hours}
          onChange={handleInputChange}
        >
          <option value="">ساعت</option>
          {availableHours.map((hour, i) => (
            <option key={i} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 bg-black/30 text-black rounded-xl border-second border-2"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
        >
          <option value="">فیلد مورد نظر</option>
          <option value="فشیال بارداری">فشیال بارداری</option>
          <option value="فشیال کلاسیک">فشیال کلاسیک</option>
          <option value="لاین مراقبت از بدن">لاین مراقبت از بدن</option>
          <option value="کربوکسی تراپی">کربوکسی تراپی</option>
          <option value="فشیال VIP">فشیال VIP</option>
          <option value="پاک سازی پوست">پاک سازی پوست</option>
        </select>

        <button
          className="w-1/2 bg-first p-2 mt-px rounded-xl text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "در حال ارسال..." : "اضافه کردن نوبت"}
        </button>

        {confirmationMessage && (
          <div className="fixed -bottom-16 z-50 right-0 m-4 p-2 bg-green-500 text-white rounded">
            {confirmationMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default Booking;
