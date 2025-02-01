import { useState, useEffect } from 'react';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
  useProver,
} from '@anon-aadhaar/react';
import bg from '../assets/bg.jpg';

export default function Anon() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('Anon Aadhaar status: ', anonAadhaar.status);
  }, [anonAadhaar]);

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
      <div style={{ marginTop: '12%' }}>
        <h1 className="text-6xl font-light text-black mb-2">
          Indian Identity Verification
        </h1>
        <p className="text-xl text-black font-light mb-4">
          Submit your aadhar proofs to generate validate zk-proofs
        </p>
        <LogInWithAnonAadhaar
          nullifierSeed={1234}
          fieldsToReveal={['revealAgeAbove18', 'revealPinCode']}
          _useTestAadhaar={true}
        />
      </div>

      <p className="text-black font-light mb-2">
        Status: {anonAadhaar?.status}
      </p>

      <div>
        {anonAadhaar?.status === 'logged-in' && (
          <>
            <p className="text-black font-light mb-2">✅ Proof is valid</p>
            {latestProof && (
              <button
                className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 mt-4"
                
                onClick={() => setShowModal(true)}
              >
                Show Proofs
              </button>
            )}
          </>
        )}
      </div>

      {/* Modal for displaying proofs */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-black w-11/12 max-w-lg p-6 rounded-lg overflow-y-auto max-h-[80vh] shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white">Proof Details</h2>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
              {JSON.stringify(latestProof, null, 2)}
            </pre>
            <button
              className="bg-white text-black px-4 py-2 mt-4 rounded w-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
