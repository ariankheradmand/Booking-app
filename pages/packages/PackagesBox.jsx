import React from "react";
import Data from "../../libs/PackagesData";

function PackagesBox() {
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center gap-3  mt-4">
        {Data.map((pakages, index) => {
          return (
            <div className="flex flex-col  w-44 bg-first h-60 rounded-lg relative nav-show">
              <h3 className="text-end font-bold py-1 px-2  text-white ">
                {pakages.name}
              </h3>
              <h4
                dir="rtl"
                className="text-center text-white px-4 text-xs pt-2"
              >
                {pakages.details}
              </h4>
              <div className="w-full flex items-center justify-center absolute bottom-3">
                <button className="mt-2 text-sm bg-accent w-6/12  rounded-xl py-1 nav-show bottom-1 text-first  ">
                  رزرو وقت
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PackagesBox;
