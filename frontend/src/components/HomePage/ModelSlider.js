import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { model_list } from "../../assets/asset";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ModelSlider = () => {
  const models = Object.values(model_list);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="relative max-w-[1400px] mx-auto mt-12">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        centerMode
        centerSlidePercentage={33.33}
        dynamicHeight={false}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
            >
              &#8249;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
            >
              &#8250;
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index) => (
          <button
            type="button"
            onClick={onClickHandler}
            className={`w-3 h-3 rounded-full mx-1 transition-all ${
              isSelected ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        )}
      >
        {models.map((model, index) => (
          <div
            key={index}
            className={`p-4 bg-white rounded-lg shadow-lg text-center transition-transform duration-300 mx-2 ${
              activeIndex === index ? "transform scale-105 shadow-xl" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="mb-4 w-full h-48 flex justify-center items-center overflow-hidden">
              <img
                src={model.img}
                alt={model.title}
                className="object-cover inset-0 w-full h-full rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
            <ul className="list-disc list-inside text-left text-gray-700">
              {model.description.map((desc, i) => (
                <li key={i} className="mb-2">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ModelSlider;
