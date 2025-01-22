import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { model_list } from "../../assets/asset";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ModelSlider.css";

const ModelSlider = () => {
  const models = Object.values(model_list);
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 1024);

  // Update layout based on screen size
  useEffect(() => {
    const handleResize = () => setIsLaptop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`slider-container ${isLaptop ? "laptop" : "mobile"}`}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        centerMode={isLaptop} // Enable center mode only for laptop screens
        centerSlidePercentage={isLaptop ? 33.33 : 100} // Full width for smaller screens
        dynamicHeight={false}
        swipeable
        emulateTouch
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="arrow arrow-prev"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="arrow arrow-next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index) => (
          <button
            type="button"
            onClick={onClickHandler}
            className={`indicator ${isSelected ? "active" : ""}`}
          />
        )}
      >
        {models.map((model, index) => (
          <div key={index} className="slide">
            <div className="slide-content">
              <img src={model.img} alt={model.title} className="slide-image" />
              <h3 className="font-bold">{model.title}</h3>
              <ul className="bullet-points">
                {model.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ModelSlider;
