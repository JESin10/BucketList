import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  DocumentData,
  Query,
  setDoc,
} from "firebase/firestore";
import { v4 as uidv4 } from "uuid";
import "firebase/compat/firestore";
import { BsTrashFill } from "react-icons/bs";
import tw from "tailwind-styled-components";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const bucketId = uidv4();
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const listRef = collection(db, `user/${currentUser?.uid}/list`);
  const [list] = useCollectionData<any>(listRef);
  const [category, setCategory] = useState<string>("");
  const [listCategory, setListCategory] = useState<string>("");

  const SubmitBucketHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current) {
      const docRef = await setDoc(
        doc(db, `user/${currentUser?.uid}/list`, bucketId),
        {
          id: bucketId,
          title: titleRef.current?.value,
          completed: false,
          category: category,
        }
      );
      console.log(docRef);

      if (titleRef.current) {
        titleRef.current.value = "";
      }
    }
  };

  const BucketCompleteHandler = async (id: string, completed: boolean) => {
    if (id) {
      const docRef = doc(listRef, id);
      try {
        await updateDoc(docRef, {
          completed: !completed, // complete 값을 반전시킵니다.
        });
        console.log(`Document with ID ${id} updated successfully`);
      } catch (error) {
        console.error(`Error updating document: ${error}`);
      }
    }
  };

  const BucketDeleteHandler = async (id: string) => {
    const docRef = doc(listRef, id);
    if (id) {
      try {
        await deleteDoc(docRef);

        console.log(`Document with ID ${id} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting document: ${error}`);
      }
    }
    console.log(id);
  };

  return (
    <div>
      <div className="flex md:flex-row ">
        <div className=" md:w-4/12 md:px-10 md:fixed mt-4 flex flex-col items-center">
          <div className="w-full shadow-sm bg-white  p-4   rounded-xl  ">
            <h1 className="text-6xl text-center font-bold">
              {list && list.length}
            </h1>
            <p className="text-xl text-center">
              Total goals in your bucket list.
            </p>

            <div className="flex items-center justify-center px-10 pt-4">
              <div className="flex items-center border p-2 px-4 rounded-xl mx-1">
                <span className="text-3xl font-bold mx-2 text-green-400">
                  {list &&
                    list.filter((wish) => wish.completed === false).length}
                </span>
                <span>Remaining</span>
              </div>

              <div className="flex items-center  p-2 rounded-xl px-4 border mx-1">
                <span className="text-3xl font-bold mx-2 text-red-400">
                  {list &&
                    list.filter((wish) => wish.completed === true).length}
                </span>
                <span>Completed</span>
              </div>
            </div>

            <form
              onSubmit={SubmitBucketHandler}
              className="flex py-6 flex-col  "
            >
              <textarea
                required
                placeholder="What's something you always wanted to do?"
                ref={titleRef}
                className="text-xl w-full h-40  my-2 p-2 border rounded outline-none"
              />

              <select
                onChange={(e) => setCategory(e.target.value)}
                className="text-xl border p-2 rounded"
              >
                <option>Travel</option>
                <option>Adventure</option>
                <option>Fun</option>
                <option>Creative</option>
                <option>Skills</option>
                <option>Education</option>
                <option>Etc</option>
              </select>

              <button className="text-white text-xl font-semibold  bg-indigo-400 hover:bg-indigo-500 rounded p-2 mt-2">
                Add to my Bucket List
              </button>
            </form>
          </div>
        </div>

        <div className="md:px-10 py-4 md:w-8/12 ml-auto mr-2">
          <div className="bg-white p-4 rounded-xl shadow-sm flex md:flex-row flex-wrap text-center items-center justify-center">
            <CategoryBtn
              onClick={(e) => setListCategory("")}
              className="cursor-pointer flex flex-col bg-yellow-100 p-2 rounded shadow-sm m-2 w-20"
            >
              <span className="text-2xl">📑</span>
              <span className="text-sm font-semibold">All</span>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Travel")}
              className="cursor-pointer flex flex-col bg-yellow-100 p-2 rounded shadow-sm m-2 w-20"
            >
              <span className="text-2xl">🏖</span>
              <span className="text-sm font-semibold">Travel</span>
            </CategoryBtn>

            <CategoryBtn
              className="bg-pink-100"
              onClick={(e) => setListCategory("Fun")}
            >
              <span className="text-2xl">🎉</span>
              <span className="text-sm font-semibold">Fun</span>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Adventure")}
              className=" bg-red-100"
            >
              <span className="text-2xl">🏄‍♂️</span>
              <span className="text-sm font-semibold">Adventure</span>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Creative")}
              className="cursor-pointer flex flex-col bg-indigo-100 p-2 rounded shadow-sm m-2 w-20"
            >
              <span className="text-2xl">🎨</span>
              <span className="text-sm font-semibold">Creative</span>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Skills")}
              className="cursor-pointer flex flex-col bg-green-100 p-2 rounded shadow-sm m-2 w-20"
            >
              <span className="text-2xl">🤹</span>
              <span className="text-sm font-semibold">Skills</span>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Education")}
              className="cursor-pointer flex flex-col bg-purple-100 p-2 rounded shadow-sm m-2 w-20"
            >
              <span className="text-2xl">🎓</span>
              <span className="text-sm font-semibold">Education</span>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Etc")}
              className="cursor-pointer flex flex-col bg-yellow-100 p-2 rounded shadow-sm m-2 w-20"
            >
              <span className="text-2xl">📙</span>
              <span className="text-sm font-semibold">Etc</span>
            </CategoryBtn>
          </div>

          <div>
            <div className=" flex flex-col mt-4 mx-auto overflow-y-scroll md:h-96 ">
              {list &&
                list
                  .filter((bucket) => {
                    if (listCategory === "") {
                      return bucket;
                    } else if (bucket.category === listCategory) return list;
                  })
                  .map((bucket, index) => {
                    return (
                      <div
                        key={index}
                        className={`bg-white shadow-sm rounded-md md:mx-4 my-1 flex flex-row ${
                          bucket.completed === false
                            ? "border-green-50 "
                            : "border-red-50"
                        }`}
                      >
                        <div className="p-2 px-6 flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={bucket.completed}
                            onClick={() =>
                              BucketCompleteHandler(bucket.id, bucket.completed)
                            }
                            className="text-green-600 h-4 w-4 mr-6"
                          />

                          <h1
                            className={`text-xl font-semibold ${
                              bucket.completed === true
                                ? "line-through text-gray-600"
                                : ""
                            }`}
                          >
                            {bucket.title}
                          </h1>
                        </div>

                        <DeleteBtnContainer>
                          <DeleteBtn
                            className="delete"
                            onClick={() => BucketDeleteHandler(bucket.id)}
                          >
                            <BsTrashFill />
                          </DeleteBtn>
                        </DeleteBtnContainer>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <></>
  );
}

const CategoryBtn = tw.div`
cursor-pointer flex flex-col p-2 rounded shadow-sm m-2 w-20
`;
// width: ${(props) => props.Width};

const DeleteBtn = tw.button`
hover:text-red-500 p-1 w-8 h-8 mt-2 mb-auto cursor-pointer
`;

const DeleteBtnContainer = tw.div`
ml-auto mr-2 flex flex-row items-center
`;
function deleteQueryBatch(
  firestore: any,
  q: Query<unknown, DocumentData>,
  batchSize: undefined,
  resolve: (value: unknown) => void
) {
  throw new Error("Function not implemented.");
}
