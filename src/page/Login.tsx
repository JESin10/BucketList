import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";

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
      window.location.replace("/dashboard");
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
      <div className="flex mt-4 ">
        <LoginFormDiv>
          <h2 className="text-2xl font-semibold mb-6">
            Welcome to BucketCheckit!
          </h2>
          {error && <p className="p-2 bg-red-100 m-4 mx-20">{error}</p>}
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center text-xl"
          >
            <LoginInput
              type="email"
              placeholder="Email"
              ref={emailRef}
            ></LoginInput>
            <LoginInput
              type="password"
              placeholder="Password"
              ref={passwordRef}
            ></LoginInput>
            <LoginBtn>Log In</LoginBtn>
          </form>

          <GoogleLoginBtn onClick={SignupWithGoogleHandler}>
            <img
              src={loadImg.googleLogo}
              className="mx-2 h-6 w-6"
              alt="google"
            />
            <span className="sm:text-sm">Continue with google</span>
          </GoogleLoginBtn>
          <h2>
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-Yellow_Bright hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </h2>
        </LoginFormDiv>
      </div>
    </div>
  );
}

const LoginFormDiv = tw.div`
text-center 
bg-gray-100  
sm:w-full 
w-2/3 mx-auto shadow-sm my-10 py-10 px-12 rounded-2xl
`;

const LoginInput = tw.input`
border p-2 m-2 rounded indent-2
`;

const GoogleLoginBtn = tw.button`
px-6 mx-auto my-2 py-2 w-2/3
border 
flex items-center justify-center shadow-sm rounded-full  
hover:bg-gray-100 bg-white
text-xl
`;

const LoginBtn = tw.button`
font-semibold 
px-5 py-2 mx-auto w-2/3 my-2
bg-Blue_No3 text-white
rounded-full 
`;
