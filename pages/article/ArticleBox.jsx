import React, { useState } from "react";
import ArticleData from "../../libs/ArticleData";
import Image from "next/image";
import 'animate.css';

const filterd = ArticleData.length >= 2 ? ArticleData.slice(0, 2) : ArticleData;

const getRandomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const formatText = (text, wordLimit, colors = ["#0D6986"]) => {
  const words = text.split(" ");
  const truncatedText = 
    words.length > wordLimit 
      ? words.slice(0, wordLimit).join(" ") + "..." 
      : text;

  return truncatedText.split("").map((char, index) => {
    if ((/[0-9]/.test(char) && char !== '.') || char === '•') {
      return <span key={index} style={{color: getRandomColor(colors)}}>{ char}</span>;
    } else if (char === '.') {
      return <span key={index} style={{color: getRandomColor(colors)}}>{char}</span>;
    }
    return char;
  }).map((node, index) => {
    if (typeof node === 'string') {
      return node.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < node.split("\n").length - 1 ? <br /> : null}
        </React.Fragment>
      ));
    }
    return node;
  });
};

function ArticleBox() {
  const [articles, setArticles] = useState(filterd);
  const [buttonText, setButtonText] = useState("ادامه مقالات");
  const [modalContent, setModalContent] = useState({ name: "", details: "" });
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddingNewContent = () => {
    if (articles.length === 2) {
      setArticles(ArticleData);
      setButtonText("بازگشت به مقالات قبلی");
    } else {
      setArticles(filterd);
      setButtonText("ادامه مقالات");
    }
  };

  const openModal = (article) => {
    setModalContent({
      name: article.name,
      details: article.details,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex flex-row-reverse w-11/12 h-28 px-1 rounded-lg overflow-hidden items-center justify-center bg-accent nav-show"
        >
          <div className="w-2/12 text-xs text-center font-bold px-1 animate__animated animate__fadeIn">
            {article.name}
          </div>
          <div
            dir="rtl"
            className="border-l border-r py-2 px-2 border-black h-full w-8/12 text-sm text-center animate__animated animate__fadeIn"
          >
            {formatText(article.details, 20, ["#0D6986"])}
          </div>
          <button
            onClick={() => openModal(article)}
            className="flex flex-col items-center justify-center w-2/12 animate__animated animate__fadeIn"
          >
            <Image src="/continued.svg" width={21} height={16} alt="Continue icon" />
          </button>
        </div>
      ))}
      <div className="w-11/12 flex items-end justify-end">
        <button
          onClick={handleAddingNewContent}
          className="w-max py-1 px-2 rounded-lg bg-accent nav-show border border-black "
        >
          {buttonText}
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div dir="rtl" className="modal show-modal pt-20 ">
          <div className="flex flex-col modal-content bg-accent rounded-lg">
            <div className="flex items-center justify-between border-b-2 border-first border-dashed mb-2">
              <h3 className="text-lg font-bold text-first">{modalContent.name}</h3>
              <span className="close text-xl " onClick={closeModal}>×</span>
            </div>
            <div>
              <p className="animate__animated animate__fadeIn">{formatText(modalContent.details, undefined, ['#0D6986'])}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleBox;