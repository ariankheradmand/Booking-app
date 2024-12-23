import { useState } from 'react';
import "../../app/globals.css";

const daysOfWeek = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
const hours = Array.from({length: 14}, (_, i) => `${i + 7}:00`);

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    weeks: '',
    hours: '',
    service: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/appointments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Appointment created successfully!');
      } else {
        console.error('Failed to create appointment');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form dir='rtl' onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">نام:</label>
        <input type="text" name="name" onChange={handleChange} value={formData.name} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">روز هفته:</label>
        <select name="weeks" onChange={handleChange} value={formData.weeks} required className="mt-1 pr-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="">انتخاب کنید</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ساعت:</label>
        <select name="hours" onChange={handleChange} value={formData.hours} required className="mt-1 pr-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="">انتخاب کنید</option>
          {hours.map(hour => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">سرویس:</label>
        <input type="text" name="service" onChange={handleChange} value={formData.service} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">شماره تلفن:</label>
        <input type="number" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
      </div>

      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        ثبت قرار ملاقات
      </button>
    </form>
  );
}