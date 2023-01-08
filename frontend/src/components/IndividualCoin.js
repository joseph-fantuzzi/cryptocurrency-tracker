import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

const IndividualCoin = ({ dark }) => {
  const [coin, setCoin] = useState(null);
  const [coinData, setCoinData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("24h");
  const { itemID } = useParams();

  const styles = {
    outerDiv: `outer-min-height w-11/12 max-w-7xl mx-auto py-10 flex flex-col ${
      dark ? "text-white" : "text-black"
    }`,
    header: "flex flex-col gap-5",
    topHeader: (dark) =>
      [
        "flex items-center border-2 justify-center py-1 bg-[#000924] rounded-2xl text-[#52E6FA] w-24",
        dark ? "border-[#E9ECEE4D]" : "border-[#000924]",
      ].join(" "),
    bottomHeader: "w-full flex flex-col sm:flex-row sm:items-center sm:justify-between",
    bottomHeaderLeft: "flex items-center gap-3",
    name: "text-2xl sm:text-3xl",
    symbol: "text-xs sm:text-base bg-[#000924] text-white rounded-xl px-2 py-1",
    image: "w-12 sm:w-16",
    chart: (dark) =>
      [
        "bg-[#000924] my-5 p-5 border-2 rounded-2xl w-full flex justify-center",
        dark ? "border-[#E9ECEE4D]" : "border-[#000924]",
      ].join(" "),
    headerContainer: "flex flex-col sm:flex-row justify-between sm:items-center",
    price: "text-lg sm:text-xl sm:mt-0 mt-2",
    text: "text-sm font-light",
    infoContainer: "mt-5 grid grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-2 gap-2",
    title: "text-sm sm:text-lg",
    inner: "flex flex-col py-1 items-center justify-center",
    number: "font-light text-[#52E6FA]",
    card: (dark) =>
      [
        "flex flex-col border-2 justify-center items-center py-10 px-2 bg-[#000924] text-white rounded-2xl",
        dark ? "border-[#E9ECEE4D]" : "border-[#000924]",
      ].join(" "),
    timeRangeContainer: (dark) =>
      [
        "w-full bg-[#000924] border-2 text-white flex items-center justify-around py-3 rounded-xl mt-5 text-sm",
        dark ? "border-[#E9ECEE4D]" : "border-[#000924]",
      ].join(" "),
    time24: (selected) =>
      [
        "cursor-pointer w-12 flex items-center justify-center rounded-xl py-1 transition duration-300 ease",
        selected === "24h" && "bg-[#52E6FA] text-black",
      ].join(" "),
    time7: (selected) =>
      [
        "cursor-pointer w-12 flex items-center justify-center rounded-xl py-1 transition duration-300 ease",
        selected === "7d" && "bg-[#52E6FA] text-black",
      ].join(" "),
    time30: (selected) =>
      [
        "cursor-pointer w-12 flex items-center justify-center rounded-xl py-1 transition duration-300 ease",
        selected === "30d" && "bg-[#52E6FA] text-black",
      ].join(" "),
    time90: (selected) =>
      [
        "cursor-pointer w-12 flex items-center justify-center rounded-xl py-1 transition duration-300 ease",
        selected === "90d" && "bg-[#52E6FA] text-black",
      ].join(" "),
    time1: (selected) =>
      [
        "cursor-pointer w-12 flex items-center justify-center rounded-xl py-1 transition duration-300 ease",
        selected === "1y" && "bg-[#52E6FA] text-black",
      ].join(" "),
    timeMax: (selected) =>
      [
        "cursor-pointer w-12 flex items-center justify-center rounded-xl py-1 transition duration-300 ease",
        selected === "Max" && "bg-[#52E6FA] text-black",
      ].join(" "),
    change: (bool) => [bool ? "text-green-500" : "text-red-500"].join(" "),
  };

  const getRange = useCallback(() => {
    if (selectedTime === "24h") {
      return "days=1";
    } else if (selectedTime === "7d") {
      return "days=7";
    } else if (selectedTime === "30d") {
      return "days=30";
    } else if (selectedTime === "90d") {
      return "days=90";
    } else if (selectedTime === "1y") {
      return "days=365";
    } else if (selectedTime === "Max") {
      return "days=max";
    }
  }, [selectedTime]);

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
      .get(
        `https://api.coingecko.com/api/v3/coins/${itemID}/market_chart?vs_currency=usd&${getRange()}`
      )
      .then((res) => {
        setCoinData(res.data.prices.map((value) => ({ x: value[0], y: value[1] })));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [itemID, getRange]);

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

  const appendClassNameToAnchorTags = () => {
    let string = coin.description.en;
    const linkRegex = /<a(.*?)>(.*?)<\/a>/g;
    let m;

    while ((m = linkRegex.exec(string)) !== null) {
      if (m.index === linkRegex.lastIndex) {
        linkRegex.lastIndex++;
      }

      const linkAttrs = m[1];
      const linkText = m[2];

      const linkElement = `<a class="link" ${linkAttrs}>${linkText}</a>`;
      string = string.replace(m[0], linkElement);
    }

    return string;
  };

  return coin ? (
    <div className={styles.outerDiv}>
      <div className={styles.header}>
        <div className={styles.topHeader(dark)}>Rank: {coin.market_cap_rank}</div>
        <div className={styles.bottomHeader}>
          <div className={styles.bottomHeaderLeft}>
            <img className={styles.image} src={coin.image.large} alt={coin} />
            <h1 className={styles.name}>{coin.name}</h1>
            <p className={styles.symbol}>{coin.symbol.toUpperCase()}</p>
            <p className={styles.change(coin?.market_data?.price_change_24h >= 0)}>
              {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
          <div className={styles.price}>
            ${coin.market_data.current_price.usd.toLocaleString("en-US")}
          </div>
        </div>
      </div>
      <div className={styles.timeRangeContainer(dark)}>
        <div className={styles.time24(selectedTime)} onClick={() => setSelectedTime("24h")}>
          24h
        </div>
        <div className={styles.time7(selectedTime)} onClick={() => setSelectedTime("7d")}>
          7d
        </div>
        <div className={styles.time30(selectedTime)} onClick={() => setSelectedTime("30d")}>
          30d
        </div>
        <div className={styles.time90(selectedTime)} onClick={() => setSelectedTime("90d")}>
          90d
        </div>
        <div className={styles.time1(selectedTime)} onClick={() => setSelectedTime("1y")}>
          1y
        </div>
        <div className={styles.timeMax(selectedTime)} onClick={() => setSelectedTime("Max")}>
          Max
        </div>
      </div>
      <Line options={options} data={data} className={styles.chart(dark)} />
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: appendClassNameToAnchorTags() }}
      />
      <div className={styles.infoContainer}>
        <div className={styles.card(dark)}>
          <p className={styles.title}>Price:</p>
          <p className={styles.number}>
            ${coin.market_data.current_price.usd.toLocaleString("en-US")}
          </p>
        </div>
        <div className={styles.card(dark)}>
          <p className={styles.title}>Market Cap:</p>
          <p className={styles.number}>
            ${coin.market_data.market_cap.usd.toLocaleString("en-US")}
          </p>
        </div>
        <div className={styles.card(dark)}>
          <div className={styles.inner}>
            <p className={styles.title}>Total Supply:</p>
            <p className={styles.number}>{coin.market_data.total_supply.toLocaleString("en-US")}</p>
          </div>
          <div className={styles.inner}>
            <p className={styles.title}>Circulating Supply:</p>
            <p className={styles.number}>
              {coin.market_data.circulating_supply.toLocaleString("en-US")}
            </p>
          </div>
        </div>
        <div className={styles.card(dark)}>
          <p className={styles.title}>Total Volume:</p>
          <p className={styles.number}>
            ${coin.market_data.total_volume.usd.toLocaleString("en-US")}
          </p>
        </div>
        <div className={styles.card(dark)}>
          <div className={styles.inner}>
            <p className={styles.title}>All Time High:</p>
            <p className={styles.number}>${coin.market_data.ath.usd.toLocaleString("en-US")}</p>
          </div>
          <div className={styles.inner}>
            <p className={styles.title}>All Time Low:</p>
            <p className={styles.number}>${coin.market_data.atl.usd.toLocaleString("en-US")}</p>
          </div>
        </div>
        <div className={styles.card(dark)}>
          <div className={styles.inner}>
            <p className={styles.title}>24h Low:</p>
            <p className={styles.number}>${coin.market_data.low_24h.usd.toLocaleString("en-US")}</p>
          </div>
          <div className={styles.inner}>
            <p className={styles.title}>24h High:</p>
            <p className={styles.number}>
              ${coin.market_data.high_24h.usd.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="outer-min-height text-4xl flex flex-col justify-center items-center">
      <h1 className={dark ? "text-white" : ""}>Loading...</h1>
      <CircularProgress color="inherit" size={100} style={{ margin: "1em" }} />
    </div>
  );
};

export default IndividualCoin;
