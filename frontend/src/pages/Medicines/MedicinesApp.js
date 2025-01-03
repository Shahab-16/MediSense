import React from 'react'
import MedicineNavbar from '../../components/Medicines/MedicineNavbar'
import MedicinesCart from './MedicinesCart'
import {Routes, Route, Navigate} from 'react-router-dom'
import MedicinesHomepage from './MedicinesHomepage'
import MedicineCheckout from './MedicineCheckout'

const MedicinesApp = () => {
  return (
    <>
    <MedicineNavbar />
    <Routes>
        <Route path="/" element={<MedicinesHomepage/>} />
        <Route path="/cart" element={<MedicinesCart/>} />
        <Route path="/placeorder" element={<MedicineCheckout/>}/>
        <Route path="*" element={<Navigate to="/medicines/homepage" />} />
      </Routes>
      
    </>
  )
}

export default MedicinesApp
