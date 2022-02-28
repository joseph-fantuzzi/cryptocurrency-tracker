import React from "react";
import "../Styles/styles.css";

const Coin = ({ coin }) => {
  return (
    <div className="bg-slate-200 w-9/12 text-sm text-center mx-auto py-2 px-2 grid grid-cols-1 md:grid-cols-5 grid-rows-4 md:grid-rows-1 flex items-center gap-2 border-2 rounded-xl my-3 drop-shadow-lg">
      <div>
        <h2 className="inline">Market Cap Rank:</h2>
        <div className="inline px-2 ml-1 rounded-full bg-cyan-700 text-white p-1">{coin.market_cap_rank}</div>
      </div>
      <div className="flex items-center justify-center">
        <img className="w-8 md:w-12 rounded-full" src={coin.image} alt="coin" />
        <h1 className="pl-3">{coin.name}</h1>
      </div>
      <h2>Symbol: {coin.symbol.toUpperCase()}</h2>
      <h2>Price: ${coin.current_price}</h2>
      <h2>Market Cap: ${coin.market_cap.toLocaleString("en-US")}</h2>
    </div>
  );
};

export default Coin;
