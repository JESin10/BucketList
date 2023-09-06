import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadImg } from "../assets/images";
import { useAuth } from "../context/AuthContext";
import Typical from "react-typical";
import tw from "tailwind-styled-components";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <div className=" m-0 p-2">
        <div className="md:mx-40 md:my-10 rounded-xl bg-white shadow-sm  mx-auto  flex md:flex-row flex-col justify-center items-center">
          <div className="md:w-8/12">
            <div className="p-12">
              <h1 className="mt-4 text-5xl text-gray-800 font-bold">
                Create and track your bucket list
              </h1>
              <div className="my-6">
                <h3 className="text-xl font-semibold py-2">
                  I always wanted to
                </h3>
                <TypingText>
                  <Typical
                    steps={[
                      "Go to World Trip",
                      3000,
                      "Run a marathon",
                      3000,
                      "Write a Book",
                      3000,
                    ]}
                    loop={Infinity}
                    wrapper="p"
                  />
                </TypingText>
              </div>

              <Link to="/signup">
                <StartBtn>Let's Start!</StartBtn>
              </Link>
            </div>
          </div>
          <img
            src={loadImg.BackGroundImg_ver1}
            alt="hero"
            className="rounded w-3/4 stom:w-full"
          />
        </div>
      </div>

      <div className=" flex md:flex-row md:w-8/12 mx-auto flex-col items-center">
        <div className="w-2/3 stom:w-3/4 text-center">
          <h1 className="text-center text-3xl font-semibold my-6 p-2">
            It could be anything, no rules
          </h1>
          <SecondBannerContent>
            It's a number of experiences or achievements that a person hopes to
            have or accomplish during their lifetime.
          </SecondBannerContent>
        </div>
        <div className="flex flex-row flex-wrap w-5/6 m-4 mx-auto justify-center">
          <span className="bg-indigo-100 rounded-full m-2 px-6 py-2 text-xl">
            Activity
          </span>
          <span className="bg-pink-100 rounded-full m-2 px-6 py-2 text-xl">
            Fun
          </span>
          <span className="bg-gray-100 rounded-full m-2 px-6 py-2 text-xl">
            Creative
          </span>
          <span className="bg-purple-100 rounded-full m-2 px-6 py-2 text-xl">
            Skills
          </span>
          <span className="bg-yellow-100 rounded-full m-2 px-6 py-2 text-xl">
            Travel
          </span>
          <span className="bg-green-100 rounded-full m-2 px-6 py-2 text-xl">
            Education
          </span>
          <span className="bg-red-100 rounded-full m-2 px-6 py-2 text-xl">
            Etc
          </span>
        </div>
      </div>

      <SecondBannerContainer>
        <SecondBannerTextContainer>
          <SecondBannerTitle>Why create a bucket list?</SecondBannerTitle>
          <SecondBannerContent>
            List and track your goals, wishes and childhood dreams. Do things
            that you love and care about.
          </SecondBannerContent>
          <SecondBannerContent>
            Achieve your dreams and live your life to the fullest.
          </SecondBannerContent>
        </SecondBannerTextContainer>
      </SecondBannerContainer>

      <SecondBannerContainer>
        <SecondBannerTextContainer>
          <SecondBannerTitle>How to create one?</SecondBannerTitle>
          <SecondBannerContent>
            Start with the first things that come into your head when you ask
            yourself, what's the thing that you always wanted to do.
          </SecondBannerContent>
          <SecondBannerContent>Don't limit yourself. </SecondBannerContent>
        </SecondBannerTextContainer>
      </SecondBannerContainer>

      <LastBanner>
        <SecondBannerTextContainer>
          <LastBannerTitle>
            Imagine what would you do if you had unlimited time, money and
            resources.
          </LastBannerTitle>

          <Link to="/signup">
            <StartBtn2>📃 Create my Bucket list now</StartBtn2>
          </Link>
        </SecondBannerTextContainer>
      </LastBanner>

      <Footer>
        <p>© 2023. ShinEunJin. All rights reserved.</p>
      </Footer>
    </>
  );
}

const TypingText = tw.div`
text-2xl italic
bg-Yellow_Light
py-2 px-6  w-max
rounded-full font-semibold 
`;

const StartBtn = tw.button`
mt-4 
bg-Blue_No3 hover:bg-Blue_No4 text-white
font-semibold shadow  
 rounded px-6 py-2 text-xl
`;

const SecondBannerContainer = tw.div`
bg-white
md:w-2/3 my-8 mx-auto p-8
flex md:flex-row flex-col-reverse
`;

const SecondBannerTextContainer = tw.div`
w-3/5 mx-auto stom:w-4/5
`;

const SecondBannerTitle = tw.h1`
md:text-4xl text-3xl font-bold mb-4
`;

const SecondBannerContent = tw.p`
text-2xl mb-2
`;

const LastBanner = tw.div`
bg-Blue_No2 text-white
py-20 
text-center 
`;

const LastBannerTitle = tw.p`
text-4xl font-semibold pb-10`;

const Footer = tw.footer`
p-8 bottom-0 font-semibold italic text-center 
bg-black text-white
`;

const StartBtn2 = tw.button`
shadow-sm font-semibold text-2xl rounded-xl 
px-8 py-4 mx-auto
text-black bg-white
`;
