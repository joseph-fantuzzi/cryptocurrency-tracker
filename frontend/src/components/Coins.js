import React from "react";
import Search from "./Search";
import Coin from "./Coin";
import CircularProgress from "@mui/material/CircularProgress";

const Coins = ({ cryptoData, searchValue, setSearchValue, toggleDark, filteredSearch }) => {
  return (
    <div className="min-h-83vh">
      <div className="pb-10 pt-1">
        <Search
          cryptoData={cryptoData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggleDark={toggleDark}
        />
        <div
          className={`hidden md:grid max-w-7xl w-11/12 text-sm text-white text-center mx-auto 
     my-8 px-3 py-5 grid-cols-5 grid-rows-1
     flex items-center rounded-xl drop-shadow-lg ${toggleDark ? "bg-neutral-900" : "bg-slate-800"}`}
        >
          <h1>Market Cap Rank</h1>
          <h1>Currency</h1>
          <h1>Symbol</h1>
          <h1>Price</h1>
          <h1>Market Cap</h1>
        </div>
        {cryptoData ? (
          filteredSearch().map((coin) => {
            return <Coin key={coin.id} coin={coin} toggleDark={toggleDark} />;
          })
        ) : (
          <div className="text-4xl flex flex-col justify-center items-center">
            <h1 className={toggleDark ? "text-white" : ""}>Loading...</h1>
            <CircularProgress size={100} style={{ margin: "1em" }} />
          </div>
        )}
      </div>
      {filteredSearch().length === 0 && cryptoData.length !== 0 ? (
        <div className={`text-center mb-auto ${toggleDark ? "text-white" : ""}`}>
          <p>No results for "{searchValue}".</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Coins;
