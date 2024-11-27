import React from 'react'

const Otp = () => {
    return (
        <div className="flex bg-white-800 text-black flex-col justify-center items-center max-w-[60%]">
            <h2 className='text-[2rem] font-bold mb-2'>Verify email</h2>
            <p className="mb-6 text-sm">A verification code has been sent to you. Enter the code below:</p>
            <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, index) => (
                    <input
                        type="text"
                        name="code"
                        maxLength="1"
                        key={index}
                        className="w-10 h-10 text-center text-lg font-semibold border border-gray-400 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                ))}
            </div>
            <button className="w-full bg-blue-800 text-black font-bold py-2 rounded-md hover:bg-blue-600">
                Verify and Register
            </button>

            <div className="flex justify-between mt-4 text-sm">
                <button className="text-blue-800 hover:underline">Back to login</button>
                <button className="text-blue-800 hover:underline">Resend it</button>
            </div>
        </div>
    )
}

export default Otp
