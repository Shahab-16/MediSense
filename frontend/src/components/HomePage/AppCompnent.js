import React from "react";
import { images } from "../../assets/asset";
import { FaArrowRightLong } from "react-icons/fa6";

const AppCompnent = () => {
  return (
    <div className="max-w-[1400px] mx-auto mt-[4rem]">
    <div className="bg-slate-200 flex justify-between items-center w-[90%] rounded-lg p-12 mx-auto">
        <div className="flex flex-col">
          <p className="text-sm text-green-800">REVOLUTIONIZING HEALTHCARE PRACTICES</p>
          <p className="text-3xl font-semibold max-w-[450px]">"Your Health, Our Technology, Better Tomorrow"</p>
        </div>
        <button className="bg-blue-800 text-white text-lg h-[50px] w-[150px] font-semibold rounded-lg pl-5 flex items-center hover:bg-blue-600">
             Get Started
            <FaArrowRightLong className="ml-2" />
          </button>
      </div>

      <div
        className="flex flex-col justify-center items-center gap-9 m-[3rem]"
        id="MobileApp"
      >
        <p className="font-semibold text-2xl max-w-[70%] md:max-w-[40%] md:text-3xl text-center ">
          For Better Experience Download{" "}
          <b className="font-bold text-black text-5xl">MediSense </b>App
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={images.appStore} alt="app_store" />
          <img src={images.playStore} alt="play_store" />
        </div>
      </div>

    </div>
  );
};

export default AppCompnent;
