import React, { useEffect } from "react";
import Search from "./Search";
import Coin from "./Coin";
import axiosWithAuth from "../axios/index";
import jwt_decode from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/other.css";
import { baseURL } from "../config/index";

const Coins = ({
  cryptoData,
  searchValue,
  setSearchValue,
  dark,
  filteredSearch,
  favoritesList,
  setFavoritesList,
}) => {
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/${decodedToken.subject}/favorites`)
      .then((res) => {
        setFavoritesList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [decodedToken.subject, setFavoritesList]);

  const styles = {
    outerDiv: "outer-min-height",
    innerDiv: "pb-10",
    infoDiv: `hidden md:grid max-w-7xl w-11/12 text-sm text-center mx-auto 
    my-8 px-3 py-5 grid-cols-6 grid-rows-1
    flex items-center rounded-xl text-white border-2 ${
      dark ? "border-[#E9ECEE]" : "border-[#000924] bg-[#000924] shadow"
    }`,
    loadingDiv: "outer-min-height text-4xl flex flex-col justify-center items-center",
    h1: dark ? "text-white" : "",
    noResultsDiv: `text-center mb-auto ${dark ? "text-white" : ""}`,
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        <Search
          cryptoData={cryptoData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          dark={dark}
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
            return <Coin key={coin.id} coin={coin} dark={dark} favoritesList={favoritesList} />;
          })
        ) : (
          <div className={styles.loadingDiv}>
            <h1 className={styles.h1}>Loading...</h1>
            <CircularProgress color="inherit" size={100} style={{ margin: "1em" }} />
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
