import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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

  const handleNavigate = (id) => {
    navigate(`/coins/${id}`);
  };

  const styles = {
    outerDiv: "outer-min-height",
    innerDiv: "pb-10",
    infoDiv: `grid max-w-7xl w-11/12 text-sm font-medium mx-auto 
    my-8 px-5 md:px-2 py-5 grid-cols-4 grid-rows-1
    flex items-center justify-end rounded-xl text-white border-2 transition duration-300 ease ${
      dark ? "border-[#E9ECEE]" : "border-[#000924] bg-[#000924] shadow"
    }`,
    loadingDiv: "outer-min-height text-4xl flex flex-col justify-center items-center",
    h1: dark ? "text-white" : "",
    noResultsDiv: `text-center mb-auto ${dark ? "text-white" : ""}`,
    priceTitle: "flex justify-end",
    mcapTitle: "hidden md:flex justify-end",
    currencyTitle: "md:pl-12 md:col-span-1 col-span-2",
    favTitle: "flex justify-end md:pr-12",
    coinDiv: "cursor-pointer",
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
          <h1 className={styles.currencyTitle}>Currency</h1>
          <h1 className={styles.priceTitle}>Price</h1>
          <h1 className={styles.mcapTitle}>Market Cap</h1>
          <h1 className={styles.favTitle}>Favorites</h1>
        </div>
        {cryptoData ? (
          filteredSearch().map((coin) => {
            return (
              <div key={coin.id} className={styles.coinDiv} onClick={() => handleNavigate(coin.id)}>
                <Coin coin={coin} dark={dark} favoritesList={favoritesList} />
              </div>
            );
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
