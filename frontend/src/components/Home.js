import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "../styles/styles.css";
import "../styles/other.css";
import "react-alice-carousel/lib/alice-carousel.css";

const Home = ({ cryptoData, toggleDark }) => {
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setTopCoins(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    outerDiv: "outer-min-height flex flex-col justify-center",
    h1: `font-bold text-center text-6xl md:text-8xl  pt-10 pb-6 ${toggleDark ? "text-white" : ""}`,
    p: `text-center px-10 mb-10 text-2xl md:text-4xl ${toggleDark ? "text-white" : ""}`,
    carousel: "flex h-1/2 items-center",
    carouselItem: "flex flex-col items-center cursor-pointer",
    btnDiv: "text-center",
    btn: `py-4 px-20 mb-10 w-3/4 max-w-lg rounded-3xl drop-shadow-xl bg-gray-200 md:text-3xl
   transition duration-500 ease ${
     toggleDark ? "hover:bg-gray-400" : "hover:bg-gray-800 hover:text-white"
   }`,
    toggleDiv: "text-center",
    toggle: "bg-[#abeb84] py-3 px-4 rounded-2xl hover:bg-[#F984FF] transition duration-500 ease",
  };

  const coins = topCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    if (coin.name !== "Tether" && coin.name !== "USD Coin" && coin.name !== "Binance USD") {
      return (
        <Link className={styles.carouselItem} to={`/coins/${coin.id}`}>
          <img src={coin?.image} alt={coin.name} style={{ marginBottom: 10 }} />
          <span>
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}></span>
        </Link>
      );
    } else {
      return null;
    }
  });

  const items = coins.filter((coin) => {
    return coin !== null;
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const Gallery = () => {
    return (
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    );
  };

  return (
    <div className={styles.outerDiv}>
      <h1 className={styles.h1}>CRYPTOX</h1>
      <p className={styles.p}>Meet the Next Generation of Cryptocurrency Tracking Software</p>
      <div className={styles.carousel}>
        <Gallery />
      </div>
      <div className={styles.btnDiv}>
        <Link to="/login">
          <button className={styles.btn}>Login</button>
        </Link>
      </div>
      <div className={styles.toggleDiv}>
        <Link to="/toggle">
          <button className={styles.toggle}>Interactive Dark Mode</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
