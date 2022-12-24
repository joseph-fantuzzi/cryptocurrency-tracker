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
    outerDiv:
      "max-w-7xl w-11/12 mx-auto outer-min-height flex gap-10 flex-col justify-center pt-10 pb-32",
    h1: `font-bold text-4xl mb-4 md:text-6xl ${dark ? "text-white" : ""}`,
    p: `text-md md:text-xl ${dark ? "text-white" : ""}`,
    carouselItem: "flex flex-col items-center justify-center cursor-pointer",
    carouselItemText: `${dark ? "text-white" : "text-black"}`,
    btn: `px-4 py-2 rounded-2xl bg-[#52E6FA] border-2 border-[#52E6FA] hover:bg-[#52E6FA4D]
   transition duration-300 ease ${dark ? "" : "shadow"}`,
    img: "mb-2 w-20 h-20 rounded-full",
  };

  const coins = topCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    if (coin.name !== "Tether" && coin.name !== "USD Coin" && coin.name !== "Binance USD") {
      return (
        <Link className={styles.carouselItem} to={`/coins/${coin.id}`}>
          <img src={coin?.image} alt={coin.name} className={styles.img} />
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
    500: {
      items: 4,
    },
    800: {
      items: 6,
    },
    1000: {
      items: 8,
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
      <div>
        <h1 className={styles.h1}>Cryptox</h1>
        <p className={styles.p}>Meet the Next Generation of Cryptocurrency Tracking Software</p>
      </div>
      <div>
        <Gallery />
      </div>
      <Link to="/register">
        <button className={styles.btn}>Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
