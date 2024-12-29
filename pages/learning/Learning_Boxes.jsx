import React from "react";
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



function Boxes() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 justify-center pt-4 border-b-2 border-first border-dashed w-11/12 pb-3 animate__animated animate__flash">
          <Image src="teach.svg" width={48} height={48} />
          <h1 className="text-2xl font-bold">آموزش</h1>
        </div>
      <Section_one data={Data[0]}/>
      <Section_two data={Data[1]}/>
      <Section_three data={Data[2]}/>
      <Section_four data={Data[3]}/>
      <Section_five data={Data[4]}/>
      <Section_six data={Data[5]}/>
      <Section_seven data={Data[6]}/>
      <Section_eight data={Data[7]}/>
    </div>
  );
}

export default Boxes;
