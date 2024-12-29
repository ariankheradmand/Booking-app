import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

function Section_two({ data }) {
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  if (!data) {
    return null; 
  }
  return (
    <div
      dir="rtl"
      className="flex items-center justify-center w-full text-white pb-14 overflow-hidden"
    >
      <div className=" w-11/12 relative flex  items-start">
        <div
          ref={ref}
          dir="rtl"
          className={`flex items-center justify-start w-full text-white  overflow-hidden pb-14 ${
            inView ? "animate__animated animate__backInRight" : "opacity-0"
          }`}
        >
          <div className="w-[130px]">
            <Image
              className="absolute right-0 opacity-90"
              src={"/Learning-Shapes/Rectangle-" + 3 + ".svg"}
              width={145}
              height={200}
            />
            <h2 className="pr-4 relative text-sm font-extralight mt-3">
              {data.d_header}
            </h2>
            {data.d_contents.map((data, index) => {
              return (
                <p className="pr-4 py-1 relative text-sm w-28 font-thin">
                  {data}
                </p>
              );
            })}
          </div>
        </div>
        <div className="w-64 h-52 bg-first opacity-90 rounded-3xl relative mt-4 animate__animated animate__backInLeft"
        >
          <Image
            className=" rounded-3xl absolute -right-3 -top-3"
            src={"/learning-face.jpg"}
            width={200}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}

export default Section_two;
