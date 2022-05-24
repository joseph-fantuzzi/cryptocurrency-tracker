import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const images = {
  img1: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  img2: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  img3: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
};

const Home = ({ cryptoData, toggleDark }) => {
  const styles = {
    outerDiv: "flex flex-col justify-center",
    h1: `font-bold text-center text-6xl md:text-8xl  pt-10 pb-6 ${toggleDark ? "text-white" : ""}`,
    p: `text-center px-10 mb-10 text-2xl md:text-4xl ${toggleDark ? "text-white" : ""}`,
    innerDiv: "flex w-full justify-center mb-10 items-center",
    img: "rounded-full w-16 md:w-20 mx-1",
    innerImg: "rounded-full w-16 md:w-20 mx-1 bg-gray-100",
    btnDiv: "text-center",
    btn: `py-4 px-20 mb-10 w-3/4 max-w-lg rounded-3xl drop-shadow-xl bg-gray-200 md:text-3xl
    transition duration-500 ease ${
      toggleDark ? "hover:bg-gray-400" : "hover:bg-gray-800 hover:text-white"
    }`,
  };

  return (
    <div className={styles.outerDiv}>
      <h1 className={styles.h1}>CRYPTOX</h1>
      <p className={styles.p}>Meet the Next Generation of Cryptocurrency Tracking Software</p>
      <div className={styles.innerDiv}>
        <img className={styles.img} src={images.img1} alt="coin" />
        <img className={styles.innerImg} src={images.img2} alt="coin" />
        <img className={styles.img} src={images.img3} alt="coin" />
      </div>
      <div className={styles.btnDiv}>
        <Link to="/login">
          <button className={styles.btn}>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
