import React, { useState } from "react";
import ArticleData from "../../libs/ArticleData";
import Image from "next/image";
import 'animate.css';

const filterd = ArticleData.length >= 2 ? ArticleData.slice(0, 2) : ArticleData;



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
      d_header: article.d_header,
      d_contents: article.d_contents
    });
    setModalVisible(true);
  };
  console.log(ArticleData.d_contents)

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
            className="flex items-center border-l border-r py-2 px-2 border-black h-full w-8/12 text-sm text-center animate__animated animate__fadeIn"
          >
            <span>{article.d_header} ...</span>
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
        <div dir="rtl" className="modal show-modal pt-20 animate__animated animate__fadeIn" onClick={closeModal}>
          <div className="flex flex-col modal-content bg-accent rounded-lg">
            <div className="flex items-center justify-between border-b-2 border-first border-dashed mb-2">
              <h3 className="text-lg font-bold text-first">{modalContent.name}</h3>
              <span className="close text-xl" onClick={closeModal}>
                ×
              </span>
            </div>
            <div>
              <p className="animate__animated animate__fadeIn">
               {modalContent.d_contents.map((data ,index) => (
                 <p className="pt-4 border-b border-first border-dotted" key={index}>{data}</p>
 
               ))}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleBox;
