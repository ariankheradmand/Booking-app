import Image from "next/image";
import React, { useState } from "react";

const data = [
  {
    name: "آرزو حسینی",
    detailed:
      "مطبش خیلی عالیه و محیطش خیلی آرامش‌بخش هست. از وقتی دوره فشیال رو انجام دادم، پوستم خیلی نرم‌تر و درخشان‌تر شده. حتما توصیه می‌کنم.",
  },
  {
    name: "مریم رحمانی",
    detailed:
      "بهترین تجربه‌ای بود که توی این چند سال اخیر داشتم! کیفیت خدمات خیلی بالا بود و کارکنان بسیار حرفه‌ای بودند. کاملا پیشنهاد می‌کنم.",
  },
  {
    name: "سحر احمدی",
    detailed:
      "خدماتشون خیلی سریع و با کیفیت بودن. از نتیجه فشیال خیلی راضی هستم. محیط شیک و تمیز باعث شد که احساس راحتی داشته باشم.",
  },
  {
    name: "نسرین محمدی",
    detailed:
      "واقعا از وقتی که به اینجا اومدم، پوستم تغییر کرده. در کنار کیفیت عالی، برخورد دوستانه و صمیمی کارکنان هم جالب بود. مطمئنا دوباره میام.",
  },
  {
    name: "لیلا قاسمی",
    detailed:
      "این درمان‌های پوستی بهترین بود. از وقتی که دوره درمان رو شروع کردم، پوستم خیلی بهتر و سالم‌تر شده. پیشنهاد می‌کنم اینجا رو امتحان کنید.",
  },
  {
    name: "مهدیه کرمانی",
    detailed:
      "یک تجربه خیلی خوب! کیفیت کار و قیمت‌ها خیلی مناسب بود. دوره‌های آموزشی برای مراقبت از پوست خیلی مفید بود. پیشنهاد می‌کنم.",
  },
  {
    name: "زهرا کریمی",
    detailed:
      "فشیال فوق‌العاده‌ای داشتم! نتیجه‌اش خیلی سریع و محسوس بود. محیط به شدت تمیز و حرفه‌ای بود. مطمئنا دوباره میام.",
  },
  {
    name: "نیلوفر جلالی",
    detailed:
      "این مرکز خیلی عالیه. تیم خیلی کاربلدی دارن و من از نتیجه خدمات واقعا راضی هستم. برخوردشون هم خیلی صمیمی و دوستانه بود.",
  },
  {
    name: "لیلا افشاری",
    detailed:
      "من چندین بار اینجا اومدم و همیشه راضی بودم. خدمات خیلی حرفه‌ای و نتیجه‌های عالی داشت. اینجا هم قیمت‌ها مناسب هستند.",
  },
  {
    name: "بهاره سلیمانی",
    detailed:
      "شما به راحتی می‌تونید به اینجا اعتماد کنید. از هر نظر کارشون عالیه. کیفیت خدمات، برخورد کارکنان و حتی محیط بسیار عالی بود.",
  },
];

function Index() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex  items-center justify-center">
      <button
        onClick={next}
        className="w-14 mr-2 px-4 py-2 bg-first text-white rounded"
      >
        <Image src="Arrow-l.svg" width={33} height={33} />
      </button>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl border-b border-dashed border-black mb-4">
          تجربیات شما عزیزان
        </h2>

        <div className="relative mb-4 w-56 h-56 py-3 px-3 rounded-xl bg-third">
          <Image src="Profile-logo.svg" className="absolute left-0" width={40} height={33} />
          <h3 className="text-lg text-end font-semibold">{data[index].name}</h3>
          <p className="text-md text-center pt-6 text-gray-600">
            {data[index].detailed}
          </p>
        </div>
      </div>
      <button
        onClick={prev}
        className=" w-14 ml-2 px-4 py-2 bg-first text-white rounded"
      >
        <Image src="Arrow-r.svg" width={33} height={33} />
      </button>
    </div>
  );
}

export default Index;
