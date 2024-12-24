import React, { useEffect, useState } from "react";

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

function Adding() {
  const [filterAppointments, setFilterAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [availableHours, setAvailableHours] = useState(hours);
  const [formData, setFormData] = useState({
    name: "",
    weeks: "",
    hours: "",
    service: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/appointments/get");
        const data = await response.json();
        setFilterAppointments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // فیلتر کردن ساعت‌های موجود بر اساس روز انتخاب شده
    if (selectedDay) {
      const reservedHours = filterAppointments
        .filter((appointment) => appointment.weeks === selectedDay)
        .map((appointment) => appointment.hours);

      setAvailableHours(hours.filter((hour) => !reservedHours.includes(hour)));
    } else {
      setAvailableHours(hours);
    }
  }, [selectedDay, filterAppointments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    // چک کردن اینکه هر فیلد پر شده است یا خیر
    const { name, weeks, hours, service, phoneNumber } = formData;
    return name && weeks && hours && service && phoneNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("لطفا همه فیلدها را پر کنید.");
      return;
    }

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
        alert("Appointment successfully created!");
        console.log(result);
        // Reset form after successful submission
        setFormData({
          name: "",
          weeks: "",
          hours: "",
          service: "",
          phoneNumber: "",
        });
      } else {
        alert("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mb-3">
      <form
        dir="rtl"
        className="flex flex-col border p-4 rounded-lg gap-2 border-black w-9/12"
        onSubmit={handleSubmit}
      >
        <input
          className="px-4 py-px"
          placeholder="نام"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <select
          className="px-3 py-px"
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
          className="px-3 py-px"
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
          className="px-3 py-px"
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
        </select>
        <input
          minLength={11}
          maxLength={11}
          className="px-4 py-px"
          placeholder="شماره تماس"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <button type="submit">اضافه کردن نوبت</button>
      </form>
    </div>
  );
}

export default Adding;
