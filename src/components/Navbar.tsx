import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaRegCompass,
  FaClipboardList,
} from "react-icons/fa";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NavbarContainer>
      <Link to="/">
        <div className="flex items-center mx-4">
          <img
            src={loadImg.bucket_color_line}
            alt="bucket"
            className="w-8 h-auto mx-2"
          />
          <h1 className="text-2xl font-extrabold sm:text-xl">BucketCheckit</h1>
        </div>
      </Link>

      <Link to="/explore" className=" text-xl">
        <div className=" hover:text-Blue_No3 font-bold flex justify-center items-center">
          <FaRegCompass className="mx-2" />
          <span className="sm:hidden stom:hidden"> Explore Someone's</span>
          <span className="tolg:hidden sm:text-md stom:visibility">
            Explore
          </span>
        </div>
      </Link>

      {currentUser ? (
        <div className="ml-auto flex flex-row items-center">
          <DashBoardLink to="/dashboard">
            <div className="flex justify-center items-center">
              <FaClipboardList className="mx-2 w-6 h-auto" />
              <span className="sm:hidden stom:hidden"> MyBoard</span>
            </div>
          </DashBoardLink>

          <div className="flex flex-row">
            <LogoutBtn onClick={handleLogout}>
              <FaSignOutAlt className="w-6 h-auto" />
            </LogoutBtn>
          </div>
        </div>
      ) : (
        <LoginLink to="/login">
          <FaSignInAlt className="w-6 h-auto" />
        </LoginLink>
      )}
    </NavbarContainer>
  );
}

const NavbarContainer = tw.div`
bg-Blue_No1
md:px-10 md:w-10/12 
mx-auto py-5 
rounded-full shadow-sm text-xl 
stom:text-lg
flex flex-row items-center justify-between
`;

const LogoutBtn = tw.button`
hover:text-red-500 
mr-2 px-6 py-1 
rounded font-semibold 
`;

const DashBoardLink = tw(Link)`
hover:text-Blue_No3
ml-auto px-2 py-1 w-fit
rounded font-bold
`;

const LoginLink = tw(Link)`
hover:text-Yellow_Light
ml-auto px-6 py-1
rounded font-semibold
`;
