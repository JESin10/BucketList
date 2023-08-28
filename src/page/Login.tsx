import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loadImg } from "../assets/images";

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login, signupWithGoogle, currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  });

  // basic singup form
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Fail to sign up");
    }
    setLoading(false);
  };

  //google signup form
  const SignupWithGoogleHandler = () => {
    setLoading(true);
    signupWithGoogle();
    navigate("/dashboard");
    setLoading(false);
  };

  return (
    <div>
      <div className="flex mt-4">
        <div className=" text-center bg-white md:w-4/12 w-full mx-auto shadow-sm p-10 px-12  rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>
          {error && <p className="p-2 bg-red-100 m-4 mx-20">{error}</p>}
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center text-xl"
          >
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="border p-2 m-2 rounded"
            ></input>
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="border p-2 m-2 rounded"
            ></input>

            <button
              disabled={loading}
              className="font-semibold px-5 py-2 mx-auto rounded-full w-1/2 m-2 bg-indigo-500 text-white"
            >
              Log In
            </button>
            <div></div>
          </form>

          <button
            onClick={SignupWithGoogleHandler}
            className="px-6 mx-auto border flex items-center justify-center shadow-sm rounded-full my-2 hover:bg-gray-100 p-2 text-xl"
          >
            <img
              src={loadImg.googleLogo}
              className="mx-2 h-6 w-6"
              alt="google"
            />
            Continue with google
          </button>
          <h2>
            Need an account?{" "}
            <Link to="/signup" className="text-yellow-300 font-semibold">
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}
