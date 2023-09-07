import React from "react";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";

export default function Loading() {
  return (
    <Background>
      <LoadingSpinner src={loadImg.LoadingSpinner} alt="Loading" />
      <LoadingText>Loading...</LoadingText>
    </Background>
  );
}

const Background = tw.div`
mx-auto py-40
w-1/2 h-auto 

flex flex-col items-center justify-center
`;

const LoadingText = tw.div`
text-center font-extrabold text-5xl
py-10
stom:text-3xl
`;

const LoadingSpinner = tw.img`
w-1/2
`;
