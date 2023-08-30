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
          <img src={loadImg.bucket} alt="bucket" className="w-6 h-6 mx-2" />
          <h1 className=" font-semibold ">Bucket</h1>
        </div>
      </Link>

      <Link to="/explore" className="mx-4 text-xl">
        <span className="mx-4 hover:text-yellow-400">✨ Explore ideas</span>
      </Link>

      {currentUser ? (
        <div className="ml-auto md:mr-10">
          <Link
            to="/dashboard"
            className="hover:text-yellow-400  mr-2 px-6 py-1 rounded  font-semibold "
          >
            dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-yellow-400  mr-2 px-6 py-1 rounded font-semibold "
          >
            Log out
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="hover:text-yellow-400 ml-auto md:mr-10 mr-2 px-6 py-1 rounded  font-semibold "
        >
          Log in
        </Link>
      )}
    </NavbarContainer>
  );
}

const NavbarContainer = tw.div`
bg-blue-100 md:w-10/12 mx-auto rounded-full shadow-sm text-xl p-4 flex flex-row items-center md:px-20
`;
