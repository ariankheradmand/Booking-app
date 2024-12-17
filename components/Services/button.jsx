import React from "react";
const buttons = ["آموزش", "مقالات", "پکیج ها ", "پاکسازی پوست"];

function button() {
  return (
  <div className="flex items-center justify-center gap-3">
     {buttons.map((buttonText , index) => (
        <button key={index} className="bg-first text-sm text-white w-20 h-20  rounded-xl">
             {buttonText}
        </button>
     ))}
  </div>
)}

export default button;
