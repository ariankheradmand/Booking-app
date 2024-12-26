import Image from "next/image";
import React, { useState, useEffect } from "react";

const weeks = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

function Sections() {
  const [activeDay, setActiveDay] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [loadingDelete, setLoadingDelete] = useState(false); // Loading state for delete

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/appointments/get");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchData();
  }, []);

  const handleDayClick = (index) => {
    setActiveDay(activeDay === index ? null : index);
  };

  const getAppointmentsForDay = (dayName) => {
    return appointments.filter((appointment) => appointment.weeks === dayName);
  };

  const handleDelete = async (id) => {
    setDeleteAppointmentId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    setLoadingDelete(true); // Start delete loading
    try {
      const response = await fetch(
        `/api/appointments/delete/${deleteAppointmentId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.id !== deleteAppointmentId
          )
        );
        setSuccessMessage("با موفقیت حذف شد");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setLoadingDelete(false); // End delete loading
      setShowConfirmDelete(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 mb-20">
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-lg mb-4">
              آیا مطمئنید که می‌خواهید این نوبت را حذف کنید؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                disabled={loadingDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg z-50"
              >
                {loadingDelete ? "در حال حذف..." : "بله"}
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg z-50"
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 mt-6">در حال بارگذاری...</div>
      ) : (
        weeks.map((day, index) => {
          const isOpen = activeDay === index;
          const dayAppointments = getAppointmentsForDay(day);
          return (
            <div
              key={index}
              className="relative w-11/12 flex flex-col items-center "
            >
              <div
                className="bg-accent w-11/12 py-2 rounded-t-xl text-center cursor-pointer nav-show"
                onClick={() => handleDayClick(index)}
              >
                {day} - {dayAppointments.length}
              </div>
              {isOpen && (
                <div
                  className="bg-accent w-11/12 rounded-b-xl text-center overflow-hidden nav-show"
                  style={{
                    maxHeight: "500px",
                    opacity: 1,
                    transition:
                      "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                    transform: "translateY(0)",
                  }}
                >
                  <div className="p-4 flex flex-col items-center w-full justify-center gap-2">
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map((app, appIndex) => (
                        <div
                          key={appIndex}
                          className="flex flex-row-reverse items-center justify-center min-h-14 w-11/12 rounded-xl relative"
                        >
                          <button
                            className="absolute -right-[25px] text-xs rotate-90 bg-red-600/50 rounded-t-xl px-2 py-1 z-20 pointer-events-auto"
                            onClick={() => handleDelete(app.id)}
                          >
                            <Image className="-rotate-90" width={15} height={25} src={"/delete.svg"} />
                          </button>
                          <a
                            href={`tel:${app.phoneNumber}`}
                            className="absolute -left-[25px] text-xs -rotate-90 bg-green-500 rounded-t-xl px-2 py-1 z-20 pointer-events-auto"
                          >
                            <Image width={15} height={25} src={"/call.svg"} />
                          </a>
                          <div className="w-11/12 h-14 z-40 text-center flex items-center justify-center border-l  text-sm bg-[#FFC890] rounded-r-xl">
                            <span>{app.name}</span>
                          </div>
                          <div className="w-11/12 h-14 text-center flex items-center justify-center border-x  text-sm bg-[#FFC890]">
                            <span>{app.hours}</span>
                          </div>
                          <div className="w-11/12 h-14 z-40  text-center flex items-center justify-center border-r  text-sm bg-[#FFC890] rounded-l-xl">
                            <span>{app.service}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500" dir="rtl">
                        نوبتی برای این روز ثبت نشده است.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Sections;
