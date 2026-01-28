import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./app/providers/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// ✅ Debug log to confirm Client ID is loaded
console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);