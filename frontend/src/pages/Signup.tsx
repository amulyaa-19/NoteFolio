import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        });
        alert("You have signed up!");
        navigate("/signin");
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to Notefolio</h1>
                <p className="text-center text-gray-600 mb-6">Create your free account to get started!</p>

                <div className="space-y-4">
                    <Input reference={usernameRef} placeholder="Username" />
                    <Input reference={passwordRef} placeholder="Password" />
                    <Button
                        onClick={signup}
                        loading={false}
                        variant="primary"
                        text="Sign Up"
                        fullWidth={true}
                    />
                </div>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/signin")}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Sign In
                    </span>
                </div>
            </div>
        </div>
    );
}
