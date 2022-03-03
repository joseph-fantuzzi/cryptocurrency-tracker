import React from "react";
import { Link } from "react-router-dom";
import "../Styles/styles.css";
import Picture from "./Picture";

const Home = ({ cryptoData, toggleDark }) => {
  return (
    <div>
      <h1
        className={`font-bold text-center text-2xl md:text-7xl pt-10 pb-6 ${
          toggleDark ? "text-white" : ""
        }`}
      >
        CRYPTOX
      </h1>
      <p
        className={`text-center px-10 pb-10 text-md md:text-4xl ${toggleDark ? "text-white" : ""}`}
      >
        Meet the Next Generation of Cryptocurrency Tracking Software
      </p>
      <div className="flex w-full justify-center items-center">
        <img className="rounded-full w-12 md:w-24 mx-1" src={cryptoData[0].image} alt="coin" />
        <img
          className="rounded-full w-12 md:w-20 mx-1 bg-gray-100"
          src={cryptoData[1].image}
          alt="coin"
        />
        <img className="rounded-full w-12 md:w-20 mx-1" src={cryptoData[6].image} alt="coin" />
        <img className="rounded-full w-12 md:w-20 mx-1" src={cryptoData[7].image} alt="coin" />
      </div>
      <Picture toggleDark={toggleDark} />
      <div className="text-center">
        <Link to="/login">
          <button
            className={`border-2 mt-6 py-1 px-7 rounded-3xl mb-10 md:mb-20 drop-shadow-md md:text-3xl
            transition duration-500 ease ${
              toggleDark
                ? "text-white border-gray-100 hover:bg-gray-100 hover:text-black"
                : "border-gray-800 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
