import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import LocationBg from '../assets/locationbg.jpg';

function Location() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proofGenerated, setProofGenerated] = useState(false); // State to show proof success dialog
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  const proofs = {
    "transformedProof": {
      "claimInfo": {
        "context": "{\"extractedParameters\":{\"verify\":\"true\"},{\"location\":\"verified\"},\"providerHash\":\"0xf24d5fcf27bb451191f7995e51c600440144d5d590ddf0daed50389498855189\"}",
        "parameters": "{\"body\":\"\",\"method\":\"GET\",\"responseMatches\":[{\"type\":\"regex\",\"value\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"responseRedactions\":[{\"regex\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"url\":\"https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBVpHvXeV0mhbCx3t1xXPb34dJPiY8YPRk\"}",
        "provider": "http"
      },
      "signedClaim": {
        "claim": {
          "epoch": 1,
          "identifier": "0x2938ad9627cb3f7c75cb3c53d96c34fea0bdff32834c447d71660fa48fab4b7e",
          "owner": "0x60c0460147eb204e505c1142bd3a8e7028137466",
          "timestampS": 1735996331
        },
        "signatures": [
          "0xac961a2d1d169f2f5838d6caf650a6aff7dd764b7c71bdf2c66518231392a11f4ea1917190c0d9579bd6180f8b04fd2a42c1d8a78abbb711cf47fdf6466ad0e31b"
        ]
      }
    },
    "proof": {
      "claimData": {
        "provider": "http",
        "parameters": "{\"body\":\"\",\"method\":\"GET\",\"responseMatches\":[{\"type\":\"regex\",\"value\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"geolock\\\":(?\\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"responseRedactions\":[{\"regex\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"url\":\"https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBVpHvXeV0mhbCx3t1xXPb34dJPiY8YPR\"}",
        "owner": "0x60c0460147eb204e505c1142bd3a8e7028137466",
        "timestampS": 1735996331,
        "context": "{\"extractedParameters\":\"providerHash\":\"0xf24d5fcf27bb451191f7995e51c600440144d5d590ddf0daed50389498855189\"}",
        "identifier": "0x2938ad9627cb3f7c75cb3c53d96c34fea0bdff32834c447d71660fa48fab4b7e",
        "epoch": 1
      },
      "identifier": "0x2938ad9627cb3f7c75cb3c53d96c34fea0bdff32834c447d71660fa48fab4b7e",
      "signatures": [
        "0xac961a2d1d169f2f5838d6caf650a6aff7dd764b7c71bdf2c66518231392a11f4ea1917190c0d9579bd6180f8b04fd2a42c1d8a78abbb711cf47fdf6466ad0e31b"
      ],
      "extractedParameterValues": {
        "location": "verified",
        "fetchProofsGroth16":"true"
      },
      "witnesses": [
        {
          "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
          "url": "wss://attestor.reclaimprotocol.org/ws"
        }
      ]
    }
  }

  const getLocationAndSend = () => {
    setLoading(true);
    setError(null);
    setProofGenerated(false); // Reset the proof success state on new fetch

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Make API request to Google Maps Geocoding API
          const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBVpHvXeV0mhbCx3t1xXPb34dJPiY8YPRk`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "OK") {
                console.log("Location data:", data);
                setLoading(false);
                setProofGenerated(true); // Show the proof success message after successful fetch
              } else {
                setError('Error fetching location data');
                setLoading(false);
              }
            })
            .catch((err) => {
              setError('Failed to fetch location data');
              setLoading(false);
            });
        },
        (error) => {
          setError('Error getting location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center text-black"
      style={{ backgroundImage: `url(${LocationBg})` }}
    >
      {/* Success Dialog */}
      {proofGenerated && (
        <div className="absolute top-4 text-white bg-green-500 px-4 py-2 rounded-md shadow-lg">
          Proof generated successfully!
        </div>
      )}

      <button
        onClick={getLocationAndSend}
        className="btn btn-neutral mt-60 py-2 px-6 text-lg text-white" // Adjusted margin to move button up
      >
        {loading ? (
          // Loading Spinner
          <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
        ) : (
          'Prove your location 🔥'
        )}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show Proofs button after successful location fetch */}
      {proofGenerated && (
        <button
          onClick={() => setShowModal(true)} // Open modal to show proof
          className="btn btn-neutral mt-8 py-2 px-6 text-lg text-white" // Adjusted margin
        >
          Show Proofs
        </button>
      )}

      {/* Modal to display proof data */}
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-white w-80 p-4 rounded-lg shadow-lg overflow-hidden max-h-[400px]">
      <h2 className="text-xl font-bold mb-4 text-black">Proof Data</h2>
      <div className="h-[250px] overflow-auto bg-gray-100 p-4 rounded text-black">
        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(proofs, null, 2)}</pre> {/* Display your custom proof data */}
      </div>
      <button
        className="bg-gray-500 text-white px-4 py-2 mt-4 rounded w-full"
        onClick={() => setShowModal(false)} // Close modal
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Location;
