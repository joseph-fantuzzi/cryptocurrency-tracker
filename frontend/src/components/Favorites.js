import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../axios/index";
import jwt_decode from "jwt-decode";
import { GoTrashcan } from "react-icons/go";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "../styles/other.css";

const baseURL = "http://localhost:9000/api/users";

const Favorites = ({ toggleDark }) => {
  const [list, setList] = useState([]);

  const styles = {
    outerDiv: "outer-min-height flex flex-col justify-center items-center",
    h1: `text-center font-bold py-8 text-5xl ${toggleDark ? "text-[#59FF00]" : "text-gray-800"}`,
    favorite:
      "grid grid-cols-3 grid-rows-1 justify-items-center items-center py-3 w-11/12 bg-gray-100 px-2 py-1 rounded-xl mb-5 drop-shadow-lg max-w-2xl",
    arrow: "drop-shadow-md cursor-pointer hover:text-gray-100 transition duration-300 ease",
    trash: "drop-shadow-md cursor-pointer hover:text-red-500 transition duration-300 ease",
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

  const deleteFavoriteHandler = (favorites_id) => {
    axiosWithAuth()
      .delete(`${baseURL}/favorites/${favorites_id}`)
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

  return (
    <div className={styles.outerDiv}>
      <h1 className={styles.h1}>Favorites List</h1>
      {list.map((favorite) => {
        return (
          <div key={favorite.favorites_id} className={styles.favorite}>
            <Link to={`/coins/${favorite.coin_name.toLowerCase()}`}>
              <BsFillArrowRightCircleFill fontSize={20} className={styles.arrow} />
            </Link>
            {favorite.coin_name}
            <GoTrashcan
              fontSize={20}
              className={styles.trash}
              onClick={() => deleteFavoriteHandler(favorite.favorites_id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
