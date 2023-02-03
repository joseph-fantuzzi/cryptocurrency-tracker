import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Coins from "../components/Coins";

describe("Coins Page Tests", () => {
  const cryptoData = [
    {
      ath: 69045,
      ath_change_percentage: -75.64629,
      ath_date: "2021-11-10T14:24:11.849Z",
      atl: 67.81,
      atl_change_percentage: 24697.54234,
      atl_date: "2013-07-06T00:00:00.000Z",
      circulating_supply: 19253518,
      current_price: 16812.21,
      fully_diluted_valuation: 353157418877,
      high_24h: 16872.54,
      id: "bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      last_updated: "2023-01-06T02:23:04.471Z",
      low_24h: 16781.94,
      market_cap: 323786796247,
      market_cap_change_24h: -357431475.8969116,
      market_cap_change_percentage_24h: -0.11027,
      market_cap_rank: 1,
      max_supply: 21000000,
      name: "Bitcoin",
      price_change_24h: -21.023117829601688,
      price_change_percentage_24h: -0.12489,
      roi: null,
      symbol: "btc",
      total_supply: 21000000,
      total_volume: 15067322971,
    },
    {
      ath: 4878.26,
      ath_change_percentage: -74.37729,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 288584.37364,
      atl_date: "2015-10-20T00:00:00.000Z",
      circulating_supply: 120525296.831877,
      current_price: 1249.52,
      fully_diluted_valuation: 150650955280,
      high_24h: 1255.58,
      id: "ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      last_updated: "2023-01-06T02:23:48.240Z",
      low_24h: 1245.12,
      market_cap: 150650955280,
      market_cap_change_24h: -485039557.2838745,
      market_cap_change_percentage_24h: -0.32093,
      market_cap_rank: 2,
      max_supply: null,
      name: "Ethereum",
      price_change_24h: -4.437001636198602,
      price_change_percentage_24h: -0.35384,
      roi: { times: 98.35609530916719, currency: "btc", percentage: 9835.60953091672 },
      symbol: "eth",
      total_supply: 120525296.831877,
      total_volume: 4022395932,
    },
  ];
  const dark = true;
  const searchValue = "";
  const setSearchValue = jest.fn();
  const favoritesList = [];
  const setFavoritesList = jest.fn();

  const filteredSearch = () => {
    const sanitize = searchValue.trim().toLowerCase();
    if (!sanitize) return cryptoData;
    return cryptoData.filter((coin) => {
      return coin.name.toLowerCase().includes(sanitize);
    });
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NzI5NjkzMDIsImV4cCI6MTY3MzA1NTcwMn0.SNUuS4TNm1miASZW13BkGfCGV-ClwQgoxgQ7A8RJWME";
  localStorage.setItem("token", token);

  test("Coins Component Renders Properly", () => {
    render(
      <Router>
        <Coins
          cryptoData={cryptoData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          dark={dark}
          filteredSearch={filteredSearch}
          favoritesList={favoritesList}
          setFavoritesList={setFavoritesList}
        />
      </Router>
    );
  });

  test("Coins Component Renders Title Bar Properly", () => {
    render(
      <Router>
        <Coins
          cryptoData={cryptoData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          dark={dark}
          filteredSearch={filteredSearch}
          favoritesList={favoritesList}
          setFavoritesList={setFavoritesList}
        />
      </Router>
    );

    const currency = screen.getByText(/Currency/);
    expect(currency).toBeInTheDocument();
    expect(currency).toBeVisible();
    expect(currency).toBeTruthy();

    const price = screen.getByText(/Price/);
    expect(price).toBeInTheDocument();
    expect(price).toBeVisible();
    expect(price).toBeTruthy();

    const marketCap = screen.getByText(/Market Cap/);
    expect(marketCap).toBeInTheDocument();
    expect(marketCap).toBeVisible();
    expect(marketCap).toBeTruthy();

    const favorites = screen.getByText("Favorites");
    expect(favorites).toBeInTheDocument();
    expect(favorites).toBeVisible();
    expect(favorites).toBeTruthy();
  });

  test("Coins Component Renders Bitcoin and Ethereum Cards Properly", () => {
    render(
      <Router>
        <Coins
          cryptoData={cryptoData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          dark={dark}
          filteredSearch={filteredSearch}
          favoritesList={favoritesList}
          setFavoritesList={setFavoritesList}
        />
      </Router>
    );

    const bitcoin = screen.getByText(/Bitcoin/);
    expect(bitcoin).toBeInTheDocument();
    expect(bitcoin).toBeVisible();
    expect(bitcoin).toBeTruthy();

    const ethereum = screen.getByText(/Ethereum/);
    expect(ethereum).toBeInTheDocument();
    expect(ethereum).toBeVisible();
    expect(ethereum).toBeTruthy();

    const bitcoinPrice = screen.getByText("$16812.21");
    expect(bitcoinPrice).toBeInTheDocument();
    expect(bitcoinPrice).toBeVisible();
    expect(bitcoinPrice).toBeTruthy();

    const ethereumPrice = screen.getByText("$1249.52");
    expect(ethereumPrice).toBeInTheDocument();
    expect(ethereumPrice).toBeVisible();
    expect(ethereumPrice).toBeTruthy();

    const bitcoinMarketCap = screen.getByText("$323,786,796,247");
    expect(bitcoinMarketCap).toBeInTheDocument();
    expect(bitcoinMarketCap).toBeVisible();
    expect(bitcoinMarketCap).toBeTruthy();

    const ethereumMarketCap = screen.getByText("$150,650,955,280");
    expect(ethereumMarketCap).toBeInTheDocument();
    expect(ethereumMarketCap).toBeVisible();
    expect(ethereumMarketCap).toBeTruthy();
  });
});
