import React, { useState } from 'react';

const weeks = [
    "شنبه", "یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"
];

function Sections() {
  const [activeDay, setActiveDay] = useState(null);

  // Function to handle click on day
  const handleDayClick = (index) => {
    setActiveDay(activeDay === index ? null : index);
  };

  return (
    <div className='flex flex-col gap-3'>
        {weeks.map((day, index) => {
            const isOpen = activeDay === index;
            return (
                <div key={index} className="relative">
                    <div 
                        className='bg-accent w-72 py-2 rounded-t-xl text-center cursor-pointer' 
                        onClick={() => handleDayClick(index)}
                    >
                        {day}
                    </div>
                    {isOpen && (
                        <div 
                            className="bg-accent w-72 rounded-b-xl text-center overflow-hidden"
                            style={{ 
                                maxHeight: '500px',  // You can adjust this value as needed
                                opacity: 1,
                                transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                                transform: 'translateY(0)'
                            }}
                        >
                            <div className="p-4">
                                {/* Example content for the day */}
                                جزئیات {day}
                            </div>
                        </div>
                    )}
                    {!isOpen && (
                        <div 
                            className="bg-accent w-72 rounded-b-xl text-center overflow-hidden"
                            style={{ 
                                maxHeight: '0', 
                                opacity: '0',
                                transform: 'translateY(-100%)',
                                transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
                            }}
                        >
                            <div className="p-4">
                                {/* Example content for the day */}
                                جزئیات {day}
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
