import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../axios/index";
import { baseURL } from "../config/index";
import jwt_decode from "jwt-decode";
import { GoTrashcan } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Favorite = ({ coin_id, favorite_id, setList, dark }) => {
  const [fav, setFav] = useState(null);

  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  const navigate = useNavigate();

  const styles = {
    favDiv: `cursor-pointer text-center mx-auto md:py-2 md:px-2 py-3 px-5 grid
   grid-cols-4 grid-rows-1 flex justify-around items-center rounded-xl my-3 
   border-2 hover:shadow-md transition duration-300 ease ${
     dark ? "text-white border-[#E9ECEE4D]" : "bg-[#E9ECEE] border-[#E9ECEE] shadow"
   }`,
    imgDiv: "flex items-center justify-start gap-2 col-span-2 md:col-span-1 md:pl-12",
    priceDiv: "flex items-center justify-end",
    mcapDiv: "hidden md:flex items-center justify-end",
    img: "w-10 md:w-12 rounded-full",
    deleteDiv: "flex justify-end md:pr-16",
    star: "cursor-pointer drop-shadow-md",
    symbol: "text-xs font-light",
    symbolDiv: "bg-[#000924] text-white py-1 px-2 rounded-xl",
    name: "hidden md:flex",
    trash: "drop-shadow-md cursor-pointer hover:text-red-500 transition duration-300 ease",
  };

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin_id}`)
      .then((res) => {
        setFav(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [coin_id]);

  const deleteFavoriteHandler = (e, id) => {
    e.stopPropagation();
    axiosWithAuth()
      .delete(`${baseURL}/favorites/${id}`)
      .then((res) => {
        axiosWithAuth()
          .get(`${baseURL}/${decodedToken.subject}/favorites`)
          .then((res) => {
            setList(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleNavigate = (id) => {
    navigate(`/coins/${id}`);
  };

  if (fav) {
    return (
      <div className={styles.favDiv} onClick={() => handleNavigate(fav.id)}>
        <div className={styles.imgDiv}>
          <img className={styles.img} src={fav.image.small} alt="coin" />
          <p className={styles.name}>{fav.name}</p>
          <div className={styles.symbolDiv}>
            <p className={styles.symbol}>{fav.symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className={styles.priceDiv}>${fav.market_data.current_price.usd}</div>
        <div className={styles.mcapDiv}>
          ${fav.market_data.market_cap.usd.toLocaleString("en-US")}
        </div>
        <div className={styles.deleteDiv}>
          <GoTrashcan
            fontSize={20}
            className={styles.trash}
            onClick={(e) => deleteFavoriteHandler(e, favorite_id)}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Favorite;
