import React, { useState, useEffect } from "react";
import axiosWithAuth from "../axios/index";
import jwt_decode from "jwt-decode";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { baseURL } from "../config/index";

const Coin = ({ coin, dark, favoritesList }) => {
  const [favorite, setFavorite] = useState(false);
  const [favoriteObj, setFavoriteObj] = useState([]);

  const styles = {
    outerDiv: `max-w-7xl w-11/12 text-center mx-auto md:py-2 md:px-2 py-3 px-5 grid
      grid-cols-4 grid-rows-1 flex justify-around items-center rounded-xl my-3 
      border-2 border-[#E9ECEE] hover:shadow-md transition duration-300 ease ${
        dark ? "text-white border-[#E9ECEE4D]" : "bg-[#E9ECEE] shadow"
      }`,
    imgDiv: "flex items-center justify-start gap-2 col-span-2 md:col-span-1 md:pl-12",
    priceDiv: "flex items-center justify-end",
    mcapDiv: "hidden md:flex items-center justify-end",
    img: "w-10 md:w-12 rounded-full",
    favDiv: "flex justify-end md:pr-16",
    star: "cursor-pointer drop-shadow-md",
    symbol: "text-xs font-light",
    symbolDiv: "bg-[#000924] text-white py-1 px-2 rounded-xl",
    name: "hidden md:flex",
  };

  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    for (let i = 0; i < favoritesList.length; i++) {
      if (favoritesList[i].coin_name === coin.name) {
        setFavorite(true);
        setFavoriteObj(favoritesList[i]);
        return;
      }
    }
    setFavorite(false);
    setFavoriteObj([]);
  }, [coin.name, favoritesList]);

  const favoritesHandler = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
    if (!favorite) {
      axiosWithAuth()
        .post(`${baseURL}/${decodedToken.subject}/favorites`, {
          coin_name: coin.name,
          coin_id: coin.id,
        })
        .then((res) => {
          return;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axiosWithAuth()
        .delete(`${baseURL}/favorites/${favoriteObj.favorites_id}`)
        .then((res) => {
          return;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.imgDiv}>
        <img className={styles.img} src={coin.image} alt="coin" />
        <p className={styles.name}>{coin.name}</p>
        <div className={styles.symbolDiv}>
          <p className={styles.symbol}>{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className={styles.priceDiv}>${coin.current_price}</div>
      <div className={styles.mcapDiv}>${coin.market_cap.toLocaleString("en-US")}</div>
      <div className={styles.favDiv}>
        {favorite ? (
          <AiFillStar className={styles.star} fontSize={22} onClick={favoritesHandler} />
        ) : (
          <AiOutlineStar className={styles.star} fontSize={22} onClick={favoritesHandler} />
        )}
      </div>
    </div>
  );
};

export default Coin;
