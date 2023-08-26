import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loadImg } from "../assets/images";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const { signup, signupWithGoogle, currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Password do not Match");
    }
    try {
      setError("");
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        await signup(emailRef.current.value, passwordRef.current.value);
      }
      navigate("/");
    } catch (err) {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  const SignupWithGoogleHandler = () => {
    setLoading(true);
    signupWithGoogle();
    navigate("/");
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-4 flex items-center justify-center">
        <div className="bg-white text-center w-full md:w-4/12 mx-auto p-10  shadow-sm rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Create your account</h2>
          {error && <p className="p-2 bg-red-100 m-4 mx-20">{error}</p>}
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center "
          >
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="text-xl border p-2 m-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="text-xl border p-2 m-2 rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={passwordConfirmRef}
              className="text-xl border p-2 m-2 rounded"
            />
            <button
              disabled={loading}
              className="px-5 text-xl font-semibold py-2 mx-auto rounded-full w-1/2 m-4 bg-indigo-500 text-white"
            >
              Sign up
            </button>
          </form>

          <button
            onClick={SignupWithGoogleHandler}
            className="mx-auto px-6 border flex items-center justify-center shadow-sm rounded-full my-2 hover:bg-gray-100 p-2 text-xl"
          >
            <img
              src={loadImg.googleLogo}
              className="mx-2 h-6 w-6"
              alt="google"
            />
            Continue with google
          </button>
          <div>
            <h2>
              Already a user?{" "}
              <Link to="/login" className="text-yellow-400 font-semibold">
                Log in
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
