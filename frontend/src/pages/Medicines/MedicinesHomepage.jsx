import React from "react";
import MedicineNavbar from "../../components/Medicines/MedicineNavbar";
import MedicineMainSection from "../../components/Medicines/MedicineMainSection";
import MedicineCategory from "../../components/Medicines/MedicineCategory";
import { useState } from "react";
import MedicineSection from "../../components/Medicines/MedicineSection";

const MedicinesHomepage = () => {
  const [ category, setCategory ] = useState("All");
  return (
    <>
      <div className="flex flex-col gap-6">
        <MedicineMainSection />
        <MedicineCategory category={category} setCategory={setCategory} />
        <MedicineSection category={category}/>
      </div>
    </>
  );
};

export default MedicinesHomepage;
