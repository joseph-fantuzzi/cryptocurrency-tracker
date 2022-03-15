import React from "react";
import { Link } from "react-router-dom";
import "../Styles/styles.css";

const Home = ({ cryptoData, toggleDark }) => {
  return (
    <div className="min-h-83vh flex flex-col justify-center">
      <h1
        className={`font-bold text-center text-6xl md:text-8xl  pt-10 pb-6 ${
          toggleDark ? "text-white" : ""
        }`}
      >
        CRYPTOX
      </h1>
      <p
        className={`text-center px-10 mb-10 text-2xl md:text-4xl ${toggleDark ? "text-white" : ""}`}
      >
        Meet the Next Generation of Cryptocurrency Tracking Software
      </p>
      <div className="flex w-full justify-center mb-10 items-center">
        <img
          className="rounded-full w-16 md:w-20 mx-1"
          src={"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"}
          alt="coin"
        />
        <img
          className="rounded-full w-16 md:w-20 mx-1 bg-gray-100"
          src={"https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"}
          alt="coin"
        />
        <img
          className="rounded-full w-16 md:w-20 mx-1"
          src={
            "https://assets.coingecko.com/coins/images/8284/large/luna1557227471663.png?1567147072"
          }
          alt="coin"
        />
        <img
          className="rounded-full w-16 md:w-20 mx-1"
          src={"https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422"}
          alt="coin"
        />
      </div>
      <div className="text-center">
        <Link to="/login">
          <button
            className={`py-4 px-20 mb-10 w-3/4 max-w-lg rounded-3xl drop-shadow-xl bg-gray-200 md:text-3xl
            transition duration-500 ease ${
              toggleDark ? "hover:bg-gray-400" : "hover:bg-gray-800 hover:text-white"
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
