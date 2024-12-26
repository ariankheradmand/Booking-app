import React from "react";
import Link from "next/link.js";
import Image from "next/image.js";

const buttons = [
  {
    route: "skin-cleaning",
    value: "پاکسازی پوست",
    imgPath: "/SkinCleaning.svg",
  },
  { route: "packages", value: "پکیج ها", imgPath: "/Package.svg" },
  { route: "article", value: "مقالات", imgPath: "/Articles.svg" },
  { route: "learning", value: "آموزش", imgPath: "/Learning.svg" },
];

function button() {
  return (
    <div className="flex items-center justify-center gap-3">
      {buttons.map((buttonText, index) => (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-first/80 p-2 rounded-t-xl border-b-2 border-white">
            <Image
              className="animate__animated animate__fadeIn custom-animation animate__infinite"
              height={25}
              width={30}
              src={"/SectionsLogo" + buttonText.imgPath}
            />
          </div>
          <Link
            href={`${buttonText.route}`}
            key={index}
            className="flex items-center justify-center text-center bg-first text-sm text-white w-20 h-20 nav-show  rounded-xl
          hover:bg-first/80 transition-all hover:border hover:border-white
           focus:bg-black"
          >
            <span>{buttonText.value}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default button;
