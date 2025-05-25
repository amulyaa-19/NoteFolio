import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      alert("Signin failed. Please check your credentials.");
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back to Notefolio
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in to access your notes and dashboard.
        </p>

        <div className="space-y-4">
          <Input reference={usernameRef} placeholder="Username" />
          <Input reference={passwordRef} placeholder="Password" />
          <Button
            onClick={signin}
            loading={false}
            variant="primary"
            text="Sign In"
            fullWidth={true}
          />
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}
