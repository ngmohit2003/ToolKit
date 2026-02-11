// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
  
//   <BrowserRouter>
//   <StrictMode>
//     <App />
//   </StrictMode>,
//   </BrowserRouter>
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <BrowserRouter>
  //     <AuthProvider>
  //       <App />
  //     </AuthProvider>
  //   </BrowserRouter>
  // </StrictMode>
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* 🔔 TOASTER MOUNTED ONCE */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111827",
              color: "#fff",
              zIndex: 9999,
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

