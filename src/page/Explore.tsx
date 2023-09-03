import React, { useEffect, useState } from "react";
import { categories } from "../assets/utils";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { firestore } from "../Firebase";
import { useAuth } from "../context/AuthContext";

export default function Explore() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [buckets, setBuckets] = useState<any[]>([]);

  const { currentUser } = useAuth();
  const dataRef = collection(firestore, `user/${currentUser?.uid}/list`);
  // console.log(dataRef);

  // const fetchIdeas = async (category: string) => {
  //   setTag(category);
  //   const query = `
  //   {
  //     buckets(where: {category: {_eq: ${category}}}) {
  //       id,
  //       title
  //     }
  //   }`;

  //   setLoading(true);
  //   const response = await fetch(
  //     "process.env.REACT_APP_FIREBASE_DATABASE_URL/user",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ query }),
  //     }
  //   );
  //   const ApiResponse = await response.json();
  //   setLoading(false);

  //   setBuckets(ApiResponse.data.bucket);
  //   window.scrollBy(0, 500);
  // };

  // const listRef = collection(firestore, `user/${uid}`);

  // const fetchBuckets = async () => {
  //   const usersCollectionRef = collection(firestore, "user");
  //   const userSnap = await getDocs(usersCollectionRef);
  //   const data = userSnap.docs.map((doc) => ({ ...doc.data() }));
  //   console.log(data);

  //   return data;
  // };
  const fetchIdeas = async (category: string) => {
    setLoading(true);
    try {
      // const q = query(
      //   collection(firestore, `user/${currentUser?.uid}/list`),
      //   where("category", "==", category)
      // );

      const q = query(
        collection(firestore, "list") // get 컬렉션 그룹
        // where("category", "==", category) //필터링 조건
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
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
      <div className="text-center mx-auto text-xl py-2 ">
        {loading ? <span>Wait, I am thinking...</span> : <span></span>}
      </div>
      <div className="md:w-10/12 mx-auto flex md:flex-row flex-col justify-center py-4 flex-wrap">
        {categories.map((category) => {
          return (
            <div
              key={category.title}
              className="shadow-xl cursor-pointer flex flex-col items-center justify-center border-gray-100 bg-white md:w-1/5 p-10 m-4 rounded-xl"
              onClick={() => fetchIdeas(category.title)}
            >
              <img
                src={category.img}
                alt="category"
                className="w-24 transform hover:scale-125 duration-300"
              />
              <h1 className="text-2xl capitalize py-2">{category.title}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <h1 className="text-6xl py-6 text-gray-800 font-bold text-center capitalize">
          {tag}
        </h1>
      </div>

      <div className="flex flex-wrap justify-center md:w-10/12 mx-auto">
        {buckets &&
          buckets.map((bucket) => {
            return (
              <div
                key={bucket.id}
                className="cursor-pointer text-center bg-white transform hover:scale-125 duration-500 px-8 shadow-sm rounded-xl p-4 text-gray-700 text-2xl m-4"
              >
                {bucket.title}
              </div>
            );
          })}
      </div>
    </div>
  );
}
