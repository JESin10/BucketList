import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
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
    <>
      <DashBoardPage>
        <BucketInputContainer>
          <BucketInputForm>
            <h1 className="text-6xl text-center font-bold">
              {list && list.length}
            </h1>
            <p className="text-xl text-center">
              Total goals in your bucket list.
            </p>
            <BucketCountContainer>
              <BucketCountDiv>
                <span className="text-3xl font-bold mx-2 text-green-400">
                  {list &&
                    list.filter((wish) => wish.completed === false).length}
                </span>
                <span>Remaining</span>
              </BucketCountDiv>

              <BucketCountDiv>
                <span className="text-3xl font-bold mx-2 text-red-400">
                  {list &&
                    list.filter((wish) => wish.completed === true).length}
                </span>
                <span>Completed</span>
              </BucketCountDiv>
            </BucketCountContainer>
            <form
              onSubmit={SubmitBucketHandler}
              className="flex py-6 flex-col  "
            >
              <textarea
                required
                placeholder="Tell me your Bucket List!"
                ref={titleRef}
                className="text-xl w-full h-40  my-2 p-2 border rounded outline-none"
              />

              <select
                onChange={(e) => setCategory(e.target.value)}
                className="text-xl border p-2 rounded"
              >
                <option selected disabled hidden>
                  Choose Category
                </option>
                <option>Travel</option>
                <option>Adventure</option>
                <option>Fun</option>
                <option>Creative</option>
                <option>Skills</option>
                <option>Education</option>
                <option>Etc</option>
              </select>
              <SubmitBtn>Add to my Bucket List</SubmitBtn>
            </form>
          </BucketInputForm>
        </BucketInputContainer>

        <MyBucketListContainer>
          <CategoryContainer>
            <CategoryBtn
              onClick={(e) => setListCategory("")}
              className="bg-yellow-100"
            >
              <CategoryIcon>📑</CategoryIcon>
              <CategoryTitle>All</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Travel")}
              className="bg-yellow-100"
            >
              <CategoryIcon>🏖</CategoryIcon>
              <CategoryTitle>Travel</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              className="bg-pink-100"
              onClick={(e) => setListCategory("Fun")}
            >
              <CategoryIcon>🎉</CategoryIcon>
              <CategoryTitle>Fun</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Adventure")}
              className=" bg-red-100"
            >
              <CategoryIcon>🏄‍♂️</CategoryIcon>
              <CategoryTitle>Adventure</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Creative")}
              className=" bg-indigo-100"
            >
              <CategoryIcon>🎨</CategoryIcon>
              <CategoryTitle>Creative</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Skills")}
              className="bg-green-100 "
            >
              <CategoryIcon>🤹</CategoryIcon>
              <CategoryTitle>Skills</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Education")}
              className="bg-purple-100"
            >
              <CategoryIcon>🎓</CategoryIcon>
              <CategoryTitle>Education</CategoryTitle>
            </CategoryBtn>

            <CategoryBtn
              onClick={(e) => setListCategory("Etc")}
              className="bg-yellow-100"
            >
              <CategoryIcon>📙</CategoryIcon>
              <CategoryTitle>Etc</CategoryTitle>
            </CategoryBtn>
          </CategoryContainer>

          <div className="bucket-contents">
            <BucketContainer>
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
                        <BucketTitle>
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
                        </BucketTitle>

                        <DeleteBtnContainer>
                          <DeleteBtn
                            className="delete"
                            onClick={() => BucketDeleteHandler(bucket.id)}
                          >
                            <BsTrashFill className="text-xl" />
                          </DeleteBtn>
                        </DeleteBtnContainer>
                      </div>
                    );
                  })}
            </BucketContainer>
          </div>
        </MyBucketListContainer>
      </DashBoardPage>
    </>
  );
}

const DashBoardPage = tw.div`
 flex 
 md:flex-row
`;

const BucketInputContainer = tw.div`
md:w-4/12 md:px-10 md:fixed 
mt-4 
flex flex-col items-center
`;

const BucketInputForm = tw.div`
w-full 
shadow-sm p-4 rounded-xl
bg-white 
`;

const BucketCountContainer = tw.div`
flex items-center justify-center 
px-10 pt-4
`;

const BucketCountDiv = tw.div`
flex items-center border 
py-2 px-4 rounded-xl mx-1
`;

const SubmitBtn = tw.button`
text-white bg-indigo-400 hover:bg-indigo-500
text-xl font-semibold rounded
p-2 mt-2
`;

const MyBucketListContainer = tw.div`
md:w-8/12 md:px-10
py-4 ml-auto mr-2
`;
const CategoryContainer = tw.div`
bg-white 
p-4 rounded-xl shadow-sm 
flex flex-wrap text-center items-center justify-center
md:flex-row 
`;

const CategoryBtn = tw.div`
cursor-pointer 
flex flex-col rounded shadow-sm 
p-2 m-2 w-20
`;
// width: ${(props) => props.Width};

const CategoryIcon = tw.span`
text-2xl
`;

const CategoryTitle = tw.span`
text-sm font-semibold
`;

const BucketContainer = tw.div`
flex flex-col 
mt-4 mx-auto 
overflow-y-scroll
md:h-96
`;

const BucketTitle = tw.div`
p-2 px-6 flex items-center
`;

const DeleteBtn = tw.button`
hover:text-red-500 
p-1 w-8 h-8 mt-2 mb-auto 
cursor-pointer
`;

const DeleteBtnContainer = tw.div`
ml-auto mr-2
flex flex-row items-center
`;
