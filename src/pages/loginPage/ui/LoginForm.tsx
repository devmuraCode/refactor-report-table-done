import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { saveToken } from "../../../auth/auth";
import { login } from "@/shared/lib/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const token = response.token.token;

      if (token) {
        saveToken(token);
        navigate("/reports");
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.status, err.response?.data);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5 animate-fade-in"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="text-base"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-base"
        />

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
