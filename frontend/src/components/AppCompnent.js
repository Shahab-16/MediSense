import React from 'react'
import { images } from '../assets/asset';

const AppCompnent = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-9 m-[3rem]' id='MobileApp'>
        <p className='font-semibold text-2xl max-w-[70%] md:max-w-[40%] md:text-3xl text-center '>For Better Experience Download <b className='font-bold text-black text-5xl'>MediSense </b>App</p>
        <div className='flex flex-col md:flex-row gap-4'>
            <img src={images.appStore} alt="app_store"/>
            <img src={images.playStore} alt='play_store'/>
        </div>
    </div>
  )
}

export default AppCompnent
