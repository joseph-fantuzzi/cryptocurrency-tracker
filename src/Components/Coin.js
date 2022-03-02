import React from "react";
import "../Styles/styles.css";

const Coin = ({ coin, toggleDark }) => {
  return (
    <div
      className={`max-w-7xl w-11/12 text-center mx-auto py-2 px-2 grid grid-cols-1 
      md:grid-cols-5 grid-rows-4 md:grid-rows-1 flex items-center 
      gap-2 rounded-xl my-3 drop-shadow-lg ${
        toggleDark ? "text-white bg-neutral-900" : "bg-slate-200"
      }`}
    >
      <div>
        <h2 className="inline md:hidden">Market Cap Rank:</h2>
        <div
          className={
            toggleDark
              ? "inline px-3 ml-1 rounded-full bg-gray-100 text-black p-1"
              : "inline px-3 ml-1 rounded-full bg-cyan-700 text-white p-1"
          }
        >
          {coin.market_cap_rank}
        </div>
      </div>
      <div className="flex items-center justify-center md:justify-start md:ml-14">
        <img className="w-10 md:w-12 rounded-full" src={coin.image} alt="coin" />
        <h1 className="pl-3">{coin.name}</h1>
      </div>
      <h2>
        <span className="md:hidden">Symbol:</span> {coin.symbol.toUpperCase()}
      </h2>
      <h2>
        <span className="md:hidden">Price:</span> ${coin.current_price}
      </h2>
      <h2>
        <span className="md:hidden">Market Cap:</span> ${coin.market_cap.toLocaleString("en-US")}
      </h2>
    </div>
  );
};

export default Coin;
