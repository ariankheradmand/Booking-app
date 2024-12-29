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
        inView ? "animate__animated animate__backInRight" : "opacity-0"
      }`}
    >
      <div className=" w-11/12 relative flex flex-col items-start animate__animated animate__backInRight">
        <div className="w-[250px]">
          <Image
            className="absolute right-0 opacity-90"
            src={"/Learning-Shapes/Rectangle-" + 7 + ".svg"}
            width={300}
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
