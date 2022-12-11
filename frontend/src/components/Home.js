import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "../styles/other.css";
import "react-alice-carousel/lib/alice-carousel.css";

const Home = ({ cryptoData, dark }) => {
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      )
      .then((res) => {
        setTopCoins(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    outerDiv: "outer-min-height flex flex-col justify-center",
    h1: `font-bold text-center text-6xl md:text-8xl  pt-10 pb-6 ${dark ? "text-white" : ""}`,
    p: `w-11/12 mx-auto max-w-7xl text-center mt-5 mb-10 text-2xl ${dark ? "text-white" : ""}`,
    carousel: "flex items-center w-11/12 mx-auto max-w-7xl mb-10",
    carouselItem: "flex flex-col items-center cursor-pointer",
    carouselItemText: `${dark ? "text-white" : "text-black"}`,
    btnDiv: "text-center",
    btn: `px-10 py-3 text-2xl rounded-2xl bg-[#52E6FA] border-2 border-[#52E6FA] hover:bg-[#52E6FA4D]
   transition duration-500 ease ${dark ? "" : "shadow"}`,
  };

  const coins = topCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    if (coin.name !== "Tether" && coin.name !== "USD Coin" && coin.name !== "Binance USD") {
      return (
        <Link className={styles.carouselItem} to={`/coins/${coin.id}`}>
          <img
            src={coin?.image}
            alt={coin.name}
            style={{ marginBottom: 10, width: 100, borderRadius: 50 }}
          />
          <span className={styles.carouselItemText}>
            {coin?.symbol.toUpperCase()}
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
                marginLeft: 10,
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
    400: {
      items: 3,
    },
    800: {
      items: 6,
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
      <h1 className={styles.h1}>Cryptox</h1>
      <p className={styles.p}>Meet the Next Generation of Cryptocurrency Tracking Software</p>
      <div className={styles.carousel}>
        <Gallery />
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
