import React from "react";
import  AnonBg from '../assets/AnonBg.jpg';

function Anon() {
  return (
  <div
    className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center text-black" 
    style={{ backgroundImage: `url(${AnonBg})` }}>
      <button className="mt-40 px-8 py-3 bg-black text-white rounded-3xl text-lg hover:bg-gray-800 transition">
        Prove my aadhar
      </button>
    </div>
  )
}

export default Anon
