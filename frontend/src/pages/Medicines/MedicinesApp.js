import React from 'react';
import MedicineNavbar from '../../components/Medicines/MedicineNavbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import MedicinesHomepage from './MedicinesHomepage';
import AllMedicineStoresPage from '../../components/Medicines/AllMedicineStoresPage';
import StoreMedicines from '../../components/Medicines/StoreMedicines';
import MedicineCheckout from './MedicineCheckout';
import MedicinesCart from './MedicinesCart';
import MedicineOrderVerify from './MedicineOrderVerify';

const MedicinesApp = () => {
  return (
    <>
      <MedicineNavbar />
      <Routes>
        <Route path="/" element={<MedicinesHomepage />} />
        <Route path="/allstores" element={<AllMedicineStoresPage />} />
        <Route path="/store/:storeName" element={<StoreMedicines />} />
        <Route path="/cart" element={<MedicinesCart/>} />
        <Route path="/checkout" element={<MedicineCheckout />} />
        <Route path="/verify-order" element={<MedicineOrderVerify />} />
        <Route path="*" element={<Navigate to="/medicines" />} />
      </Routes>
    </>
  );
};

export default MedicinesApp;
