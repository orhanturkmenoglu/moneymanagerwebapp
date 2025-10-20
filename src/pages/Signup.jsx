import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/asset";
import Input from "../components/Input";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    // Burada axios veya fetch ile signup request atabilirsin
    console.log({ fullName, email, password });

    // Başarılı ise login sayfasına yönlendir
    navigate("/login");
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div
          className="bg-white bg-opacity-95 backdrop-blur-sm
            rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        >
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings by joining with us.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}

            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeHolder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeHolder="fullname@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeHolder="*****"
              type="password"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-slate-600 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
