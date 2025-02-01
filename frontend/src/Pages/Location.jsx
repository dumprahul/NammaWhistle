import React from "react";
import  LocationBg from '../assets/LocationBg.jpg';

function Location() {
  return (
  <div
    className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center text-black" 
    style={{ backgroundImage: `url(${LocationBg})` }}>
      <button className="mt-60 mb-10 px-8 py-3 bg-black text-white rounded-3xl text-lg hover:bg-gray-800 transition">
        Prove my Location
      </button>
    </div>
  )
}

export default Location