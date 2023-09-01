import React from "react";
import tw from "tailwind-styled-components";

export default function Button() {
  return <div>Button</div>;
}

const CategoryBtn = tw.div`
cursor-pointer flex flex-col p-2 rounded shadow-sm m-2 w-20
`;
// width: ${(props) => props.Width};
