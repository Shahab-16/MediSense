import React from 'react'

export default function Footer() {
    return (
        <div className='md:mx-10'>
            {/* flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm */}
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm '>
                {/* Logo */}
                <div>
                    <p className='text-[30px] font-bold text-blue-800'><a href="/">MediSense</a></p>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div>
                    <p className='text-xl font-medium'>COMPANY</p>
                    <ul>Home</ul>
                    <ul>About Us</ul>
                    <ul>Contact Us</ul>
                    <ul>Privacy Policy</ul>
                </div>
                <div>
                    <p className='text-xl font-medium'>GET IN TOUCH</p>
                    <ul>+91-9305363223</ul>
                    <ul>medisense@gmail.com</ul>
                </div>
            </div>
        </div>
    )
}
