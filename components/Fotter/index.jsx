import Image from "next/image";
import React from "react";

function index() {
  return (
    <div className="flex flex-col items-center justify-center relative h-80 pt-24 overflow-hidden">
      <Image
        src={"Ellipse-footer.svg"}
        width={1500}
        height={1500}
        className="absolute top-5"
      />
      <Image
        src={"Footer-logo.svg"}
        width={120}
        height={250}
        className="z-10"
      />
      <div dir="rtl" className="text-end z-10 text-white pt-4">
        <span className="font-bold">آدرس:</span> اسلام آباد غرب - خیابان شهید چمران{" "}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default index;
