import React, { useState, useEffect } from "react";
import axiosWithAuth from "../axios/index";
import jwt_decode from "jwt-decode";
import "../styles/other.css";
import { baseURL } from "../config/index";
import Favorite from "./Favorite";

const Favorites = ({ dark }) => {
  const [list, setList] = useState([]);

  const styles = {
    outerDiv: `max-w-7xl w-11/12 mx-auto py-10 lg:py-20 outer-min-height ${
      dark ? "text-white" : "text-gray-800"
    }`,
    h1: `font-bold mb-2 text-2xl lg:text-4xl ${dark ? "text-white" : "text-gray-800"}`,
    p: "text-xs lg:text-lg",
    infoDiv: `grid text-sm font-medium 
    mb-8 mt-6 px-5 md:px-2 py-5 grid-cols-4 grid-rows-1
    flex items-center justify-end rounded-xl text-white border-2 transition duration-300 ease ${
      dark ? "border-[#E9ECEE]" : "border-[#000924] bg-[#000924] shadow"
    }`,
    currencyTitle: "md:pl-12 md:col-span-1 col-span-2",
    priceTitle: "flex justify-end",
    mcapTitle: "hidden md:flex justify-end",
    deleteTitle: "flex justify-end md:pr-12",
  };

  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/${decodedToken.subject}/favorites`)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [decodedToken.subject]);

  return (
    <div className={styles.outerDiv}>
      <h1 className={styles.h1}>Favorites List</h1>
      {list.length === 0 ? (
        <p className={styles.p}>There are no favorite coins in your list currently.</p>
      ) : (
        <>
          <div className={styles.infoDiv}>
            <h1 className={styles.currencyTitle}>Currency</h1>
            <h1 className={styles.priceTitle}>Price</h1>
            <h1 className={styles.mcapTitle}>Market Cap</h1>
            <h1 className={styles.deleteTitle}>Delete</h1>
          </div>
          {list.map((favorite) => {
            return (
              <div key={favorite.coin_id}>
                <Favorite
                  coin_id={favorite.coin_id}
                  favorite_id={favorite.favorites_id}
                  setList={setList}
                  dark={dark}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Favorites;
