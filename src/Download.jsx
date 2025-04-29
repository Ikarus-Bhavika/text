import React, { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

function Download() {
  const { userData, blobUrl, fileType } = useUserContext();
  const [fileReady, setFileReady] = useState(false);
  const [filePreview, setFilePreview] = useState("");

  useEffect(() => {
    // Check if blob URL exists
    if (blobUrl) {
      setFileReady(true);
      
      // If it's a text file, fetch and display preview
      if (fileType === 'text') {
        fetch(blobUrl)
          .then(response => response.text())
          .then(text => {
            setFilePreview(text);
          })
          .catch(error => {
            console.error("Error fetching text preview:", error);
            setFilePreview("Preview not available");
          });
      }
    } else {
      // If no blob URL in context, show error
      alert("No file found. Please go back and create the file first.");
    }
    
    // Cleanup function
    return () => {
      // Clean up if needed
    };
  }, [blobUrl, fileType]);

  const handleDownloadFile = () => {
    if (blobUrl) {
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${userData.firstName}_${userData.lastName}_info.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("File is not ready yet. Please go back and create the file first.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Download Your Text File</h1>
      
      {fileReady ? (
        <div>
          <div style={{ 
            margin: "20px auto", 
            padding: "20px", 
            border: "1px solid #ccc", 
            borderRadius: "8px",
            width: "300px",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontFamily: "monospace"
          }}>
            {filePreview}
          </div>
          
          <div style={{ margin: "20px 0" }}>
            <button 
              onClick={handleDownloadFile}
              style={{ 
                backgroundColor: "#4285F4",
                color: "white",
                padding: "12px 24px", 
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Download Text File
            </button>
          </div>
        </div>
      ) : (
        <p>Preparing your file, please wait...</p>
      )}
    </div>
  );
}

export default Download;