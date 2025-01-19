import React from "react";
import onlineMedicineImage from "../../assets/delivery.jpg";

const MedicineCard = () => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg lg:flex-row lg:justify-between items-center bg-gray-100 p-6 lg:p-8 rounded-lg shadow-lg">
      <div className="flex-1 mb-6 lg:mb-0 lg:mr-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 text-center lg:text-left">
          Online Medicines at Your Fingertips
        </h1>
        <p className="text-gray-700 mb-4 text-sm md:text-base text-center lg:text-left">
          Experience the ultimate convenience of ordering medicines online with
          our user-friendly platform. Whether it's prescription drugs or
          over-the-counter medications, we've got you covered. Easily browse
          through our extensive catalog, read detailed product descriptions, and
          order with just a few clicks. Stay informed with up-to-date
          information on drug interactions and health advice from certified
          pharmacists.
        </p>
        <p className="text-gray-700 text-sm md:text-base text-center lg:text-left">
          Join thousands of satisfied customers who trust us for their
          pharmaceutical needs. Our secure payment gateway ensures your
          transactions are safe, and our fast delivery service means you'll get
          your medicines on time, every time. Your health and well-being are
          just a click away.
        </p>
      </div>
      <div className="w-full max-w-xs sm:max-w-sm lg:w-1/3">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={onlineMedicineImage}
          alt="Online Medicines"
        />
      </div>
    </div>
  );
};

export default MedicineCard;
