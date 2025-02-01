import { ReclaimClient } from "@reclaimprotocol/zk-fetch";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import transformForOnchain from '@reclaimprotocol/zk-fetch';
import bg from '../desibg.jpg';

// Replace with your own appID and appSecret from https://dev.reclaimprotocol.org/
const reclaim = new ReclaimClient("0xe2013d79a7b624e5C02Bb411994c141694Cf525C","0xae840fc6d48ed841cc25f717853c497471160a4bb1d547b8d55ed7dece36f1c6");

function Fetch() {
  const [proofData, setProofData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const generateProof = async () => {
    setIsFetching(true);

    try {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser.");
        setIsFetching(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Replace with your Geocoding API URL
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBVpHvXeV0mhbCx3t1xXPb34dJPiY8YPRk`;
        const data = await reclaim.zkFetch(
          url,
          { method: "GET" },
          {
            responseMatches: [
              {
                type: "regex",
                value: '"plus_code"\\s*:\\s*\\{(?:[^}]*\\n?)*\\}',
              },
            ],
            responseRedactions: [
              {
                regex: '"plus_code"\\s*:\\s*\\{(?:[^}]*\\n?)*\\}',
              },
            ],
            
          }
        );
        const proofData = await transformForOnchain(proofData);
        
        setProofData(data);
        setIsFetching(false);
        toast.success("Proof generated successfully!");
      }, (error) => {
        toast.error(`Error getting location: ${error.message}`);
        setIsFetching(false);
      });
    } catch (error) {
      setIsFetching(false);
      toast.error(`${error?.message}`);
      console.error(error);
    }
  };

  const handleClaim = () => {
    navigate('/Wallet'); // Navigate to the /Wallet page
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <div style={{ marginTop: '8%' }}>
        <h1 className="text-6xl font-light text-black mb-2">Prove your location.</h1>
        <p className="text-xl text-black font-light">
          Proofs are generated and verified by zkTLS. Claims but with proofs.
        </p>

        {!proofData && (
          <button
            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 mt-4"
            onClick={generateProof}
          >
            {isFetching ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Fetching...
              </span>
            ) : (
              "Generate Proof"
            )}
          </button>
        )}

        {proofData && (
          <>
            <button
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Show Proof
            </button>
            <button
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 mt-4"
              style={{ marginTop: '12px' }}
              onClick={handleClaim}
            >
              Claim
            </button>
          </>
        )}
      </div>

      {isModalOpen && proofData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-black w-4/5 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Proof Data</h3>
            <pre className="bg-gray-200 p-4 rounded-lg text-sm overflow-auto">
              {JSON.stringify(proofData, null, 2)}
            </pre>
            <button
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 mt-4"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Fetch;
