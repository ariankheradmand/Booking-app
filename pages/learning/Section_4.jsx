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
      ref={ref}
      dir="rtl"
      className={`flex items-center justify-center w-full text-white overflow-hidden pb-14 ${
        inView ? "animate__animated animate__backInLeft" : "opacity-0"
      }`}
    >
      <div className=" w-11/12 relative flex flex-col items-end animate__animated animate__backInLeft">
        <div className="w-[285px]">
          <Image
            className="absolute left-0 opacity-90"
            src={"/Learning-Shapes/Rectangle-" + 4 + ".svg"}
            width={285}
            height={200}
          />
          <h2 className="pr-4 relative text-sm font-extralight mt-3">
            {data.d_header}
          </h2>
          {data.d_contents.map((data, index) => {
            return (
              <p className="pr-4 py-1 relative text-sm  font-thin">{data}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Section_two;
