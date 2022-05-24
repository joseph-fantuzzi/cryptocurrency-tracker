import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "../styles/styles.css";

const Coin = ({ coin, toggleDark }) => {
  const [favorite, setFavorite] = useState(false);

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
          <AiFillStar className={styles.star} fontSize={22} onClick={() => setFavorite(false)} />
        ) : (
          <AiOutlineStar className={styles.star} fontSize={22} onClick={() => setFavorite(true)} />
        )}
      </div>
    </div>
  );
};

export default Coin;
