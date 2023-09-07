import React from "react";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div>
      <img alt="ErrorPage" src={loadImg.ErrorImg} />
      <ErrorNumber>404 Error</ErrorNumber>
      <ErrorComment>Oops, I can't find this Page.</ErrorComment>
      <div className="w-2/3 mx-auto flex justify-center">
        <MovetoBtn onClick={() => navigate("/")}>Move to Main</MovetoBtn>
      </div>
    </div>
  );
}

const ErrorNumber = tw.p`
text-center mb-6
font-extrabold text-8xl
smd:text-4xl sm:text-3xl sm:mb-2
text-Orange_Bright drop-shadow-xl
`;

const ErrorComment = tw.div`
text-center mb-5
font-extrabold text-5xl
smd:text-3xl sm:text-lg stom:mb-3
`;

const MovetoBtn = tw.button`
text-4xl p-6 mt-6 mb-10 w-fit 
bg-Blue_No4 text-white 
font-bold rounded-2xl
smd:text-2xl smd:p-4
sm:text-lg sm:p-[10px] sm:mb-6 sm:mt-2
hover:bg-Blue_No5
`;
