// import React, { useState } from "react";
// import { QRCodeSVG } from "qrcode.react";
// import { useUserContext } from "./UserContext";
// import { useNavigate } from "react-router-dom";

// function QRPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [showQR, setShowQR] = useState(false);
//   const { updateUserData } = useUserContext();
//   const navigate = useNavigate();

//   const handleGenerateQR = () => {
//     if (firstName && lastName) {
//       // Update the global context with user data
//       updateUserData(firstName, lastName);
//       setShowQR(true);
//     }
//   };

//   const handleNavigateToIntro = () => {
//     if (firstName && lastName) {
//       updateUserData(firstName, lastName);
//       navigate("/intro");
//     }
//   };


//   const qrData = `${window.location.origin}/intro?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;

//   return (
//     <div className="container">
//       <h1>QR Code Generator</h1>
//       <input
//         type="text"
//         placeholder="Enter your first name here"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//       />
//       <br />
//       <input
//         type="text"
//         placeholder="Enter your last name here"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//       />
//       <br />
//       <button onClick={handleGenerateQR}>Generate QR Code</button>
//       <button onClick={handleNavigateToIntro} style={{ marginLeft: "10px" }}>
//         Go to Introduction
//       </button>

//       {showQR && (
//         <div style={{ marginTop: "20px" }}>
//           <QRCodeSVG value={qrData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default QRPage;

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function QRPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);
  const { updateUserData } = useUserContext();
  const navigate = useNavigate();

  const handleGenerateQR = () => {
    if (firstName && lastName) {
      // Update the global context with user data
      updateUserData(firstName, lastName);
      setShowQR(true);
      setShowNextPage(true); // Show the Next Page button after QR generation
    }
  };

  const handleNavigateToIntro = () => {
    if (firstName && lastName) {
      updateUserData(firstName, lastName);
      
      // Create a 3D model blob (assuming you have a GLB model in your project)
      fetch('/model.glb') // Path to your GLB model in public or src folder
        .then(response => response.blob())
        .then(blob => {
          // Store the blob in sessionStorage (as a URL)
          const url = URL.createObjectURL(blob);
          sessionStorage.setItem('modelBlobUrl', url);
          
          // Navigate to intro page
          navigate("/intro");
        })
        .catch(error => {
          console.error("Error loading 3D model:", error);
          navigate("/intro");
        });
    }
  };

  const qrData = `${window.location.origin}/intro?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter your first name here"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your last name here"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <button onClick={handleGenerateQR}>Generate QR Code</button>
      
      {showQR && (
        <div style={{ marginTop: "20px" }}>
          <QRCodeSVG value={qrData} />
        </div>
      )}

      {showNextPage && (
        <div style={{ marginTop: "20px" }}>
          <button 
            onClick={handleNavigateToIntro} 
            style={{ 
              backgroundColor: "#4285F4", 
              color: "white", 
              padding: "10px 20px", 
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}

export default QRPage;