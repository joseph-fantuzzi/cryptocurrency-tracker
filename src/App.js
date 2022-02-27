import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";

function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCryptoData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      {cryptoData.map((coin) => {
        return <Coin key={coin.id} coin={coin} />;
      })}
    </div>
  );
}

export default App;
