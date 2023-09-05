import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components/";

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
      navigate("/dashboard");
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
    navigate("/dashboard");
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-4 flex items-center justify-center">
        <SignUpFormDiv>
          <h2 className="text-2xl font-semibold mb-4">Create your account</h2>
          {error && <p className="p-2 bg-red-100 m-4 mx-20">{error}</p>}
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center "
          >
            <SignUpInput type="email" placeholder="Email" ref={emailRef} />
            <SignUpInput
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <SignUpInput
              type="password"
              placeholder="Confirm Password"
              ref={passwordConfirmRef}
            />
            <SignUpBtn>Sign up</SignUpBtn>
          </form>

          <GoogleLoginBtn onClick={SignupWithGoogleHandler}>
            <img
              src={loadImg.googleLogo}
              className="mx-2 h-6 w-6"
              alt="google"
            />
            Continue with google
          </GoogleLoginBtn>
          <div>
            <h2>
              Already a user?{" "}
              <Link
                to="/login"
                className="text-Yellow_Bright hover:underline font-semibold"
              >
                Log in
              </Link>
            </h2>
          </div>
        </SignUpFormDiv>
      </div>
    </div>
  );
}

const SignUpFormDiv = tw.div`
text-center 
bg-gray-100  
sm:w-full 
w-2/3 mx-auto shadow-sm my-10 py-10 px-12 rounded-2xl
`;

const SignUpInput = tw.input`
border p-2 m-2 rounded indent-2
`;

const GoogleLoginBtn = tw.button`
px-6 mx-auto my-2 py-2 w-2/3
border 
flex items-center justify-center shadow-sm rounded-full  
hover:bg-gray-100 bg-white
text-xl
`;

const SignUpBtn = tw.button`
font-semibold text-xl sm:text-lg
px-5 py-2 mx-auto w-2/3 my-2
bg-Blue_No3 text-white
rounded-full 
`;
