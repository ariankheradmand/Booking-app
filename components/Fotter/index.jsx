import Image from "next/image";
import React from "react";

function index() {
  return (
    <div className="flex flex-col items-center justify-center relative h-120 pt-24 overflow-hidden">
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
        <span className="font-bold">آدرس:</span> اسلام آباد غرب - خیابان شهید چمران
      </div>
      <div dir="rtl" className="text-end z-10 text-white pt-4">
        <span className="font-bold">شماره تماس: </span>08347788567</div>
      <div className="flex gap-6 items-center justify-center mt-4 w-full h-20 z-10">
      <Image
        src={"SocialLogo/Telegram.svg"}
        width={75}
        height={250}
        className="z-10"
      />
      <Image
        src={"SocialLogo/Instagram.svg"}
        width={70}
        height={250}
        className="z-20"
      />
      </div>
    </div>
  );
}

export default index;
