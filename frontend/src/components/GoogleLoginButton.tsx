import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import api from "../app/lib/axios";
import { useAuth } from "../app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GoogleAuthLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Credential Response:", credentialResponse);

    if (!credentialResponse.credential) return;
    try {
      const res = await api.post("/api/auth/google", {
        credential: credentialResponse.credential,
      });
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setError("Google login failed.")}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}