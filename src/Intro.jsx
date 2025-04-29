import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

function Intro() {
  const [searchParams] = useSearchParams();
  const { userData, updateBlobUrl, updateFileType } = useUserContext();
  const navigate = useNavigate();
  
  const firstName = userData.firstName || searchParams.get("firstName");
  const lastName = userData.lastName || searchParams.get("lastName");

  const handleCreateTextBlob = () => {
    // Create text content with user info
    const currentDate = new Date().toLocaleDateString();
    const textContent = `Name: ${firstName} ${lastName}\nDate: ${currentDate}\nUser Information File`;
    
    // Create a blob from the text content
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Store the blob URL in context
    updateBlobUrl(url);
    updateFileType('text');
    
    // Navigate to download page
    navigate("/download");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hi, My name is {firstName} {lastName}</h1>
      
      <div style={{ margin: "20px 0" }}>
        <button 
          onClick={handleCreateTextBlob}
          style={{ 
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px", 
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Create Text File
        </button>
      </div>
    </div>
  );
}

export default Intro;