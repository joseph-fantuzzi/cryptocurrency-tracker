import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip);

const IndividualCoin = ({ toggleDark }) => {
  const [coin, setCoin] = useState(null);
  const [coinData, setCoinData] = useState([]);
  const { itemID } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${itemID}`)
      .then((res) => {
        setCoin(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${itemID}/market_chart?vs_currency=usd&days=7`)
      .then((res) => {
        setCoinData(res.data.prices.map((value) => ({ x: value[0], y: value[1] })));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [itemID]);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const data = {
    labels: coinData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: itemID,
        data: coinData.map((val) => val.y),
        borderColor: "#52E6FA",
      },
    ],
  };

  return coin ? (
    <div
      className={`w-11/12 max-w-7xl mx-auto py-10 flex flex-col ${
        toggleDark ? "text-white" : "text-black"
      }`}
    >
      <div className="flex items-center gap-3">
        <img className="w-20" src={coin.image.large} alt={coin} />
        <h1 className="text-3xl">{coin.name}</h1>
      </div>
      <div className="mt-5 w-full h-1/2 hinline-block relative bg-[#000924] p-5 rounded-2xl">
        <div className="w-full h-full flex justify-center">
          <Line options={options} data={data} />
        </div>
      </div>
      <p>Sybmol: {coin.symbol}</p>
      <p>Market Cap Rank: {coin.market_cap_rank}</p>
      <p>Market Capitalization: {coin.market_data.market_cap.usd}</p>
      <p>Circulating Supply: {coin.market_data.circulating_supply}</p>
      <p>Total Supply: {coin.market_data.total_supply}</p>
      <p>{coin.description.en}</p>
      <h2>Links</h2>
      <ul className="text-left">
        <li>
          <a href={coin.links.homepage[0]}>{coin.links.homepage[0]}</a>
        </li>
        <li>
          <a href={coin.links.blockchain_site[0]}>{coin.links.blockchain_site[0]}</a>
        </li>
      </ul>
      <h2>Market Data:</h2>
      <div>
        <p>Price: {coin.market_data.current_price.usd}</p>
        <p>All Time High: {coin.market_data.ath.usd}</p>
        <p>Percent from ATH: {coin.market_data.ath_change_percentage.usd}</p>
        <p>ATH Date: {coin.market_data.ath_date.usd}</p>
      </div>
      <div>
        <p>All Time Low: {coin.market_data.atl.usd}</p>
        <p>Percent from ATL: {coin.market_data.atl_change_percentage.usd}</p>
        <p>ATL Date: {coin.market_data.atl_date.usd}</p>
      </div>
      <p>Fully Diluted Market Valuation: {coin.market_data.fully_diluted_valuation.usd}</p>
      <p>Total Volume: {coin.market_data.total_volume.usd}</p>
      <p>24 Hour High: {coin.market_data.high_24h.usd}</p>
      <p>24 Hour Low: {coin.market_data.low_24h.usd}</p>
    </div>
  ) : (
    <div className="outer-min-height text-4xl flex flex-col justify-center items-center">
      <h1 className={toggleDark ? "text-white" : ""}>Loading...</h1>
      <CircularProgress color="inherit" size={100} style={{ margin: "1em" }} />
    </div>
  );
};

export default IndividualCoin;
