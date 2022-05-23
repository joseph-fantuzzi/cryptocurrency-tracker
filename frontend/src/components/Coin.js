import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Coin = ({ coin, toggleDark }) => {
  const styles = {
    outerDiv: `cursor-pointer hover:bg-gray-600 hover:text-white transition duration-300 ease max-w-7xl w-11/12 text-center mx-auto py-2 px-2 grid grid-cols-1 
      md:grid-cols-5 grid-rows-4 md:grid-rows-1 flex items-center 
      gap-2 rounded-xl my-3 drop-shadow-lg ${
        toggleDark ? "text-white bg-neutral-900" : "bg-slate-200"
      }`,
    h2: "inline md:hidden",
    rankDiv: toggleDark
      ? "inline px-3 ml-1 rounded-full bg-gray-100 text-black p-1"
      : "inline px-3 ml-1 rounded-full bg-gray-800 text-white p-1",
    h1: "pl-3",
    nameDiv: "flex items-center justify-center md:justify-start md:ml-14",
    img: "w-10 md:w-12 rounded-full",
    span: "md:hidden",
  };

  return (
    <Link to={`/coins/${coin.id}`}>
      <div className={styles.outerDiv}>
        <div>
          <h2 className={styles.h2}>Market Cap Rank:</h2>
          <div className={styles.rankDiv}>{coin.market_cap_rank}</div>
        </div>
        <div className={styles.nameDiv}>
          <img className={styles.img} src={coin.image} alt="coin" />
          <h1 className={styles.h1}>{coin.name}</h1>
        </div>
        <h2>
          <span className={styles.span}>Symbol:</span> {coin.symbol.toUpperCase()}
        </h2>
        <h2>
          <span className={styles.span}>Price:</span> ${coin.current_price}
        </h2>
        <h2>
          <span className={styles.span}>Market Cap:</span> $
          {coin.market_cap.toLocaleString("en-US")}
        </h2>
      </div>
    </Link>
  );
};

export default Coin;
