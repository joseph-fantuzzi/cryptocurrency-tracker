import React from "react";
import "../styles/other.css";

const Favorites = ({ favoritesList }) => {
  const styles = {
    outerDiv: "outer-min-height flex flex-col justify-center items-center",
    h1: "text-center text-[#59FF00] font-bold py-8 text-5xl",
    favorite: "w-11/12 bg-gray-100 px-2 py-1 rounded-xl mb-5 shadow-lg",
  };

  return (
    <div className={styles.outerDiv}>
      <h1 className={styles.h1}>Favorites List</h1>
      {favoritesList.map((favorite) => {
        return (
          <div key={favorite.favorites_id} className={styles.favorite}>
            {favorite.coin_name}
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
