import React from "react";
import Search from "./Search";
import Coin from "./Coin";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/other.css";

const Coins = ({ cryptoData, searchValue, setSearchValue, toggleDark, filteredSearch }) => {
  const styles = {
    outerDiv: "outer-min-height",
    innerDiv: "pb-10",
    infoDiv: `hidden md:grid max-w-7xl w-11/12 text-sm text-white text-center mx-auto 
    my-8 px-3 py-5 grid-cols-6 grid-rows-1
    flex items-center rounded-xl drop-shadow-lg ${toggleDark ? "bg-neutral-900" : "bg-slate-800"}`,
    loadingDiv: "text-4xl flex flex-col justify-center items-center",
    h1: toggleDark ? "text-white" : "",
    noResultsDiv: `text-center mb-auto ${toggleDark ? "text-white" : ""}`,
  };

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        <Search
          cryptoData={cryptoData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggleDark={toggleDark}
        />
        <div className={styles.infoDiv}>
          <h1>{""}</h1>
          <h1>Currency</h1>
          <h1>Symbol</h1>
          <h1>Price</h1>
          <h1>Market Cap</h1>
          <h1>Favorites</h1>
        </div>
        {cryptoData ? (
          filteredSearch().map((coin) => {
            return <Coin key={coin.id} coin={coin} toggleDark={toggleDark} />;
          })
        ) : (
          <div className={styles.loadingDiv}>
            <h1 className={styles.h1}>Loading...</h1>
            <CircularProgress size={100} style={{ margin: "1em" }} />
          </div>
        )}
      </div>
      {filteredSearch().length === 0 && cryptoData.length !== 0 ? (
        <div className={styles.noResultsDiv}>
          <p>No results for "{searchValue}".</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Coins;
