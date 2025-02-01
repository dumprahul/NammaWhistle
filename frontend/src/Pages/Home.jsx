import React from "react";
import HomeBg from '../assets/HomeBg.jpg';
import { useNavigate } from "react-router-dom"; 

function Home() {
    const navigate = useNavigate();
  return (
  <div
    className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center text-black" 
    style={{ backgroundImage: `url(${HomeBg})` }}>
      <button 
      onClick={() => navigate("/anon")}
      className="mt-60 mb-10 px-8 py-3 bg-black text-white font-semibold rounded-3xl text-lg hover:bg-gray-800 transition">
        Get Started !
      </button>
    </div>
  )
}

export default Home
