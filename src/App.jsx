import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRPage from "./Qr";
import Intro from "./Intro";
import Download from "./Download";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QRPage />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;