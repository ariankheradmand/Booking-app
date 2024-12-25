import React from "react";
import Article from "../../pages/article/index.jsx";
import Link from "next/link.js";

const buttons = [
    {route : "skin-cleaning" ,value: "پاکسازی پوست"},
    {route : "packages" ,value: "پکیج ها"},
    {route : "article" ,value: "مقالات"},
    {route : "learning" ,value: "آموزش"},
    ];

function button() {
  return (
    <div className="flex items-center justify-center gap-3">
      {buttons.map((buttonText, index) => (
        <Link
          href={`${buttonText.route}`}
          key={index}
          className="flex items-center justify-center text-center bg-first text-sm text-white w-20 h-20 nav-show  rounded-xl
          hover:bg-first/80 transition-all hover:border hover:border-white
           focus:bg-black"
        >
          <span>{buttonText.value}</span>
        </Link>
      ))}
    </div>
  );
}

export default button;
