import React, { useState, useEffect, useRef } from "react";
import Data from "../../libs/LearningData";
import Image from "next/image";
import Section_one from "./Section_1";
import Section_two from "./Section_2";
import Section_three from "./Section_3";
import Section_four from "./Section_4";
import Section_five from "./Section_5";
import Section_six from "./Section_6";
import Section_seven from "./Section_7";
import Section_eight from "./Section_8";
import { useRouter } from "next/router";

function Boxes() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]); // State to hold snowflake positions
  const containerRef = useRef(null); // Ref to get container dimensions
  const router = useRouter();

  useEffect(() => {
    setShow(true);

    // Generate random positions for the snowflakes based on container size
    const generateRandomPositions = () => {
      const container = containerRef.current;
      if (!container) return [];
      const containerHeight = container.scrollHeight;
      const containerWidth = container.scrollWidth;

      return Array.from({ length: 50 }, () => ({
        top: Math.random() * containerHeight + 70 + "px",
        left: Math.random() * containerWidth - 50 + "px",
      }));
    };

    setSnowflakes(generateRandomPositions());
  }, []);

  const handleBack = () => {
    setExit(true);
    setTimeout(() => {
      setShow(false);
      setExit(false);
      router.push("/");
    }, 500);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center relative w-full"
    >
      <div className="flex items-center gap-2 justify-center pt-4 border-b-2 border-first border-dashed w-11/12 pb-3 animate__animated animate__flash">
        <Image src="teach.svg" width={48} height={48} alt="Teach Icon" />
        <h1 className="text-2xl font-bold">آموزش</h1>
      </div>

      <Image
          className="animate__animated animate__flash custom-animation absolute top-48 right-0"
          src="SnowBig.svg"
          width={150}
          height={105}
          alt={`SnowArt`}
        />
        <Image
          className="animate__animated animate__flash custom-animation absolute top-[750px] rotate-180 left-0"
          src="SnowBig.svg"
          width={150}
          height={105}
          alt={`SnowArt`}
        />
        <Image
          className="animate__animated animate__flash custom-animation absolute top-[1450px] right-0"
          src="SnowBig.svg"
          width={150}
          height={105}
          alt={`SnowArt`}
        />

      {/* Render snowflakes */}
      {snowflakes.map((position, index) => (
        <Image
          className="animate__animated animate__flash custom-animation animate__infinite"
          key={index}
          src="Snow.svg"
          width={15}
          height={15}
          alt={`Snowflake ${index + 1}`}
          style={{ position: "absolute", ...position }}
        />
      ))}

      <button
        onClick={handleBack}
        className="absolute right-4 mt-4 p-2 bg-first text-white rounded nav-show"
      >
        برگشت
      </button>
      <Section_one data={Data[0]} />
      <Section_two data={Data[1]} />
      <Section_three data={Data[2]} />
      <Section_four data={Data[3]} />
      <Section_five data={Data[4]} />
      <Section_six data={Data[5]} />
      <Section_seven data={Data[6]} />
      <Section_eight data={Data[7]} />
    </div>
  );
}

export default Boxes;
