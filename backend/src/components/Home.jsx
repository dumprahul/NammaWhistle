import HomeBg from '../assets/homebg.jpg';
import { useNavigate } from "react-router-dom"; 

function Home() {
    const navigate = useNavigate();
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center text-black" 
      style={{ backgroundImage: `url(${HomeBg})` }}>
      <button 
        onClick={() => navigate("/anon")}
        className="btn btn-neutral mt-40  py-2 px-6 text-lg text-white"> {/* Add margin-top here */}
        Get Started 🔥
      </button>
    </div>
  );
}

export default Home;

