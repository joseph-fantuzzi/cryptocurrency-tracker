import React from "react";

const Coin = ({ coin }) => {
  return (
    <div className="coin-container">
      <img src={coin.image} alt="coin" />
      <h1>{coin.name}</h1>
      <h2>{coin.symbol}</h2>
      <h2>Price: {coin.current_price}</h2>
    </div>
  );
};

export default Coin;
