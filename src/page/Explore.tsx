import React, { useEffect, useId, useState } from "react";
import { categories } from "../assets/utils";
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../context/AuthContext";
import tw from "tailwind-styled-components";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Explore() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [buckets, setBuckets] = useState<any[]>([]);
  const { currentUser } = useAuth();
  const dataRef = collection(db, "AllList");

  const fetchIdeas = async (category: string) => {
    setLoading(true);
    try {
      const q = query(
        dataRef, // get 컬렉션 그룹
        where("category", "==", category) //필터링 조건
      );

      const querySnapshot = await getDocs(dataRef);
      const data = querySnapshot.docs.map((doc) => doc.data());
      const filteredData = data.filter((list) => list.category === category);

      setBuckets(filteredData);
      setTag(category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIdeas(tag);
  }, [tag]);

  console.log(tag, buckets);

  return (
    <div>
      {/* <div className="text-center mx-auto text-xl py-2 ">
        {loading ? <span>Let me see...</span> : <span></span>}
      </div> */}
      <CategoryContainer>
        {categories.map((category) => {
          return (
            <CategoryDiv
              key={category.title}
              onClick={() => fetchIdeas(category.title)}
            >
              <CategoryImg src={category.img} alt="category_img" />
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryDiv>
          );
        })}
      </CategoryContainer>
      <div>
        <BucketCategoryTitle>{tag}</BucketCategoryTitle>
      </div>
      <BucketListContainerDiv>
        {buckets &&
          buckets.map((bucket) => {
            return (
              <BucketListDiv key={bucket.id}>{bucket.title}</BucketListDiv>
            );
          })}
      </BucketListContainerDiv>
    </div>
  );
}

const CategoryDiv = tw.div`
cursor-pointer
flex flex-col items-center justify-center
p-10 m-4 rounded-xl w-1/5
border-solid border-2 border-gray-200
bg-white 
md:w-1/6 sm:w-1/12 hover:shadow-md
hover:border-Blue_No3
`;

const CategoryContainer = tw.div`
mx-auto py-4 
flex flex-row justify-center flex-wrap
md:w-10/12 md:flex-row 
`;

const CategoryImg = tw.img`
w-24 transform  duration-500
hover:scale-110
md:w-16 sm:w-10
`;

const CategoryTitle = tw.h1`
text-2xl capitalize py-2
md:
`;

const BucketListContainerDiv = tw.div`
mx-auto
flex flex-wrap justify-center 
md:w-10/12 
`;

const BucketListDiv = tw.div`
cursor-pointer transform hover:scale-[105%] duration-200
text-center text-2xl 
px-8 py-4 m-4
shadow-sm rounded-xl
bg-Blue_No1 text-gray-700 border-solid border-Blue_No5 border-2
`;

const BucketCategoryTitle = tw.h1`
text-5xl font-bold 
py-6
text-center capitalize
text-gray-800
`;
