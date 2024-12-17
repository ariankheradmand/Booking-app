import React from "react";
import ArticleData from "../../libs/ArticleData";
import Image from "next/image";

const filterd = ArticleData.slice(0, 2);

// Helper function to truncate text and preserve formatting
const formatText = (text, wordLimit) => {
  const words = text.split(" ");
  const truncatedText =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;

  // Replace newline characters with <br /> for proper formatting
  return truncatedText.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

function ArticleBox() {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {filterd.map((filterdItems, index) => (
        <div
          key={index}
          className="flex flex-row-reverse w-11/12 h-28 px-1 rounded-lg overflow-hidden items-center justify-center bg-accent nav-show"
        >
          <div className="w-2/12 text-sm text-center font-bold px-1">
            {filterdItems.name}
          </div>
          <div
            dir="rtl"
            className="border-l border-r pt-4 px-2 border-black h-full w-8/12 text-sm text-center"
          >
            {formatText(filterdItems.details, 20)}
          </div>
          <div className="flex flex-col gap-4 items-center justify-center w-2/12">
            <div className="text-center ">ادامه مطلب</div>
            <Image src="continued.svg" width={21} height={16} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleBox;
