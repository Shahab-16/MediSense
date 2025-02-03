import React from "react";
import { images } from "../../assets/asset";
import { 
  MagnifyingGlassIcon,
  HeartIcon,
  UserGroupIcon,
  CpuChipIcon 
} from "@heroicons/react/24/outline";

const ModelSection = () => {
  return (
    <div className="relative mx-auto max-w-7xl bg-gradient-to-br from-blue-50 to-blue-100 p-12 rounded-3xl shadow-2xl overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/30 blur-3xl rounded-full"></div>
      
      <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="relative group border-4 border-blue-100 rounded-2xl overflow-hidden">
            <img
              src={images.modelSectionImage}
              alt="Medisense AI Technology"
              className="rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-2 rounded-full mb-6">
            <CpuChipIcon className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 font-semibold">AI-Powered Healthcare Platform</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
            Smart Health Solutions with Medisense AI
          </h2>
          
          <p className="text-lg text-blue-700 leading-relaxed">
            Our advanced ML/DL models analyze symptoms to provide:
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MagnifyingGlassIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Accurate Disease Prediction
                </h3>
                <p className="text-blue-700">
                  Multi-model AI system analyzing 100+ symptoms with 95% diagnostic accuracy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-blue-100 p-3 rounded-lg">
                <HeartIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Personalized Diet Plans
                </h3>
                <p className="text-blue-700">
                  AI-generated nutrition recommendations tailored to your condition and preferences
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-blue-100 p-3 rounded-lg">
                <UserGroupIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Expert Doctor Matching
                </h3>
                <p className="text-blue-700">
                  Smart recommendation system connects you with specialized physicians in your area
                </p>
              </div>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg flex items-center gap-2">
            <MagnifyingGlassIcon className="w-5 h-5" />
            Try Our AI Diagnosis →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSection;