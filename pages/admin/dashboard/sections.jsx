import React, { useState, useEffect } from 'react';

const weeks = [
  "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"
];

function Sections() {
  const [activeDay, setActiveDay] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/appointments/get'); // Adjust API endpoint if needed
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

  // Function to handle appointment deletion
  const handleDelete = async (id) => {
    setDeleteAppointmentId(id);
    setShowConfirmDelete(true); // Show confirmation popup
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/appointments/delete/${deleteAppointmentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        // Update the state to remove the deleted appointment from the list
        setAppointments((prevAppointments) =>
          prevAppointments.filter(appointment => appointment.id !== deleteAppointmentId)
        );
        setSuccessMessage('با موفقیت حذف شد');
        setTimeout(() => {
          setSuccessMessage(''); // Hide success message after 3 seconds
        }, 3000);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    } finally {
      setShowConfirmDelete(false); // Close the confirmation popup
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false); // Close the confirmation popup without deleting
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Success Message Popup */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-lg mb-4">آیا مطمئنید که می‌خواهید این نوبت را حذف کنید؟</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                بله
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      )}

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
                        <button
                          className="absolute right-0 text-xs"
                          onClick={() => handleDelete(app.id)} // Trigger delete confirmation
                        >
                          حذف
                        </button>
                        <div className="w-11/12 h-14 text-center flex items-center justify-center border-l border text-sm bg-[#FFC890]">
                          <span>{app.name}</span>
                        </div>
                        <div className="w-11/12 h-14 text-center flex items-center justify-center border-x border text-sm bg-[#FFC890]">
                          <span>{app.hours}</span>
                        </div>
                        <div className="w-11/12 h-14 text-center flex items-center justify-center border-r border text-sm bg-[#FFC890]">
                          <span>{app.service}</span>
                        </div>
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
