import React, { useState, useEffect } from 'react';

const weeks = [
  "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"
];

function Sections() {
  const [activeDay, setActiveDay] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/appointments/get'); // آدرس API خودتان را تنظیم کنید
      const data = await response.json();
      setAppointments(data);
    }
    fetchData();
  }, []);

  const handleDayClick = (index) => {
    setActiveDay(activeDay === index ? null : index);
  };

  const getAppointmentsForDay = (dayName) => {
    return appointments.filter(appointment => appointment.weeks === dayName);
  };

  return (
    <div className="flex flex-col gap-3">
      {weeks.map((day, index) => {
        const isOpen = activeDay === index;
        const dayAppointments = getAppointmentsForDay(day);
        return (
          <div key={index} className="relative">
            <div
              className="bg-accent w-72 py-2 rounded-t-xl text-center cursor-pointer"
              onClick={() => handleDayClick(index)}
            >
              {day} - {dayAppointments.length}
            </div>
            {isOpen && (
              <div
                className="bg-accent w-72 rounded-b-xl text-center overflow-hidden"
                style={{
                  maxHeight: '500px',
                  opacity: 1,
                  transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                  transform: 'translateY(0)',
                }}
              >
                <div className="p-4 flex flex-col items-center w-72 justify-center gap-2">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((app, appIndex) => (
                      <div key={appIndex} className="flex flex-row-reverse items-center justify-center min-h-14 w-11/12 rounded-xl overflow-hidden">
                        <button className="absolute right-0 text-xs">حذف</button>
                        <div className="w-11/12 h-14 text-center flex items-center justify-center border-l border text-sm bg-[#FFC890]"><span>{app.name}</span></div>
                        <div className="w-11/12 h-14 text-center flex items-center justify-center border-x border text-sm bg-[#FFC890]"><span>{app.hours}</span></div>
                        <div className="w-11/12 h-14 text-center flex items-center justify-center border-r border text-sm bg-[#FFC890]"><span>{app.service}</span></div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">نوبتی برای این روز ثبت نشده است.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Sections;
