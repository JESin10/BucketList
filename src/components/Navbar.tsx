import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";

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
        <div className="flex items-center">
          <img
            src={loadImg.bucket_color}
            alt="bucket"
            className="w-6 h-6 mx-2"
          />
          <h1 className=" font-semibold ">BucketCheckit</h1>
        </div>
      </Link>

      <Link to="/explore" className="mx-4 text-xl">
        <span className="mx-4 hover:text-blue-600 font-bold">
          🔎 Explore Someone's
        </span>
      </Link>

      {currentUser ? (
        <div className="ml-auto md:mr-10">
          <Moveto to="/dashboard"> MyBoard</Moveto>
          <LogoutBtn onClick={handleLogout}>👤 Log out</LogoutBtn>
        </div>
      ) : (
        <Moveto to="/login">👤 Log in</Moveto>
      )}
    </NavbarContainer>
  );
}

const NavbarContainer = tw.div`
bg-blue-100 
md:px-20 md:w-10/12 
mx-auto p-4
rounded-full shadow-sm text-xl 
flex flex-row items-center 
`;

const LogoutBtn = tw.button`
hover:text-red-400 
mr-2 px-6 py-1 
rounded font-semibold
`;

const Moveto = tw(Link)`
hover:text-yellow-500 
ml-auto mr-2 px-6 py-1
md:mr-10 
rounded font-semibold
`;
