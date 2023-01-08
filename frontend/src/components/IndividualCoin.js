import React, { useState, useEffect } from "react";
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
  const { itemID } = useParams();

  const styles = {
    outerDiv: `outer-min-height w-11/12 max-w-7xl mx-auto py-10 flex flex-col ${
      dark ? "text-white" : "text-black"
    }`,
    header: "flex items-center gap-3",
    name: "text-3xl",
    image: "w-16",
    chart: "bg-[#000924] my-5 p-5 rounded-2xl w-full flex justify-center",
    headerContainer: "flex flex-col sm:flex-row justify-between sm:items-center",
    price: "text-xl mt-5 sm:mt-0",
    change: (bool) => [bool ? "text-green-500" : "text-red-500"].join(" "),
  };

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
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <img className={styles.image} src={coin.image.large} alt={coin} />
          <h1 className={styles.name}>{coin.name}</h1>
          <p>{coin.symbol.toUpperCase()}</p>
          <p className={styles.change(coin?.market_data?.price_change_24h >= 0)}>
            {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
        <div className={styles.price}>${coin.market_data.current_price.usd}</div>
      </div>
      <Line options={options} data={data} className={styles.chart} />
      <div dangerouslySetInnerHTML={{ __html: appendClassNameToAnchorTags() }} />
    </div>
  ) : (
    <div className="outer-min-height text-4xl flex flex-col justify-center items-center">
      <h1 className={dark ? "text-white" : ""}>Loading...</h1>
      <CircularProgress color="inherit" size={100} style={{ margin: "1em" }} />
    </div>
  );
};

export default IndividualCoin;
