import Image from "next/image";
import React from "react";

function Section_two({ data }) {
  if (!data) {
    return null; // Don't render the section if data is missing
  }
  return (
    <div
      dir="rtl"
      className="flex items-center justify-center w-full text-white mt-12 "
    >
      <div className=" w-11/12 relative flex flex-col items-end">
        <div className="w-[260px]">
          <Image
            className="absolute left-0 opacity-90"
            src={"/Learning-Shapes/Rectangle-" + 8 + ".svg"}
            width={270}
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
