import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserInfo from '../../components/Dashboard/userInfo/userInfo'
import OrderedMedicines from '../../components/Dashboard/userInfo/OrderedMedicines'
import DeliveredMedicines from '../../components/Dashboard/userInfo/DeliveredMedicines'
import MyAppointments from '../../components/Dashboard/userInfo/MyAppointments'
import ConsultedDoctors from '../../components/Dashboard/userInfo/ConsultedDoctors'
import { Navigate } from 'react-router-dom'

const UserInfoApp = () => {
  return (
    <div>
    <Routes>
        <Route path="/" element={<UserInfo />}/>
        <Route path='/delivered-medicines' element={<DeliveredMedicines/>}/>
        <Route path='/consulted-doctors' element={<ConsultedDoctors/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/my-ordered-medicines' element={<OrderedMedicines/>}/>
        <Route path="*" element={<Navigate to="/userinfo/home"/>} />
    </Routes>  
    </div>
  )
}

export default UserInfoApp;

