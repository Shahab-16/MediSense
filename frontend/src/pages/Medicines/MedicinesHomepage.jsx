import React, { useState } from "react";
import MedicineNavbar from "../../components/Medicines/MedicineNavbar";
import MedicineMainSection from "../../components/Medicines/MedicineMainSection";
import MedicineCategory from "../../components/Medicines/MedicineCategory";
import MedicineStoreList from "../../components/Medicines/MedicineStoreList"; // Import the store list
import MedicineSection from "../../components/Medicines/MedicineSection";

const MedicinesHomepage = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Main Section for Medicines */}
        <MedicineMainSection />

        {/* Medicine store list */}
        <MedicineStoreList />
        
        {/* Category filter component */}
        <MedicineCategory category={category} setCategory={setCategory} />

        <MedicineSection category={category} />
        
      </div>
    </>
  );
};

export default MedicinesHomepage;
