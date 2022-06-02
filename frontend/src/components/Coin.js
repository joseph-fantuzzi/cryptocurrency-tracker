import React, { useState, useEffect } from "react";
import axiosWithAuth from "../axios/index";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "../styles/styles.css";

const baseURL = "http://localhost:9000/api/users";

const Coin = ({ coin, toggleDark, favoritesList }) => {
  const [favorite, setFavorite] = useState(false);
  const [favoriteObj, setFavoriteObj] = useState([]);

  const styles = {
    outerDiv: `max-w-7xl w-11/12 text-center mx-auto py-2 px-2 grid grid-cols-1 
      md:grid-cols-6 grid-rows-4 md:grid-rows-1 flex items-center 
      gap-2 rounded-xl my-3 drop-shadow-lg ${
        toggleDark ? "text-white bg-neutral-900" : "bg-slate-200"
      }`,
    imgDiv: "flex justify-center",
    img: "w-10 md:w-12 rounded-full",
    span: "md:hidden",
    favDiv: "flex justify-center",
    star: "cursor-pointer drop-shadow-md",
    go: "flex justify-center",
    icon: "drop-shadow-md cursor-pointer hover:text-white transition duration-500 ease",
  };

  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    favoritesList.forEach((obj) => {
      if (obj.coin_name === coin.name) {
        setFavorite(true);
        setFavoriteObj(obj);
        return;
      }
    });
  }, [favoritesList, coin.name]);

  const favoritesHandler = () => {
    setFavorite(!favorite);
    if (!favorite) {
      axiosWithAuth()
        .post(`${baseURL}/${decodedToken.subject}/favorites`, { coin_name: coin.name })
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
      <div className={styles.go}>
        <Link to={`/coins/${coin.id}`}>
          <BsFillArrowRightCircleFill fontSize={22} className={styles.icon} />
        </Link>
      </div>
      <div className={styles.imgDiv}>
        <img className={styles.img} src={coin.image} alt="coin" />
      </div>
      <h2>
        <span className={styles.span}>Symbol:</span> {coin.symbol.toUpperCase()}
      </h2>
      <h2>
        <span className={styles.span}>Price:</span> ${coin.current_price}
      </h2>
      <h2>
        <span className={styles.span}>Market Cap:</span> ${coin.market_cap.toLocaleString("en-US")}
      </h2>
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
