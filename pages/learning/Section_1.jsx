import Image from 'next/image';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

function Section_one({ data }) {
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
      className={`flex items-center justify-center w-full text-white mt-6 overflow-hidden pb-14 ${
        inView ? 'animate__animated animate__backInRight' : 'opacity-0'
      }`}
    >
      <div className="w-11/12 relative">
        <Image
          className="opacity-90 absolute right-0"
          src={`/Learning-Shapes/Rectangle-1.svg`}
          width={230}
          height={200}
          alt="Learning Shape"
        />
        <h2 className="pr-4 relative text-sm font-extralight mt-2">{data.d_header}</h2>
        {data.d_contents.map((content, index) => (
          <p key={index} className="pr-4 relative text-sm w-44 font-thin">
            {content}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Section_one;
