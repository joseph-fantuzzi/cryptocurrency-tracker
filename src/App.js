import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";
import { Routes, Route, NavLink } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCryptoData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 text-white py-8 px-5 flex justify-between items-center">
        <h1 className="text-2xl">Crypto Dashboard</h1>
        <div className="hidden md:w-1/2 md:flex md:justify-around md:items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/coins">Coins</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
        <div className="md:hidden">
          {toggleNav ? (
            <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleNav(false)} />
          ) : (
            <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleNav(true)} />
          )}
          {toggleNav && (
            <div
              className="fixed top-0 -right-2 p-5 flex flex-col justify-start items-end w-[70vw] h-screen shadow-2xl md:hidden rounded-md 
            text-white bg-gray-800 animate-slide-in"
            >
              <div className="w-full">
                <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleNav(false)} />
              </div>
              <div className="flex flex-col items-end text-2xl pr-5">
                <NavLink className="py-4" to="/" onClick={() => setToggleNav(false)}>
                  Home
                </NavLink>
                <NavLink className="py-4" to="/coins" onClick={() => setToggleNav(false)}>
                  Coins
                </NavLink>
                <NavLink className="py-4" to="/login" onClick={() => setToggleNav(false)}>
                  Login
                </NavLink>
                <NavLink className="py-4" to="/register" onClick={() => setToggleNav(false)}>
                  Register
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path="/coins"
          element={cryptoData.map((coin) => {
            return <Coin key={coin.id} coin={coin} />;
          })}
        />
      </Routes>
    </div>
  );
}

export default App;
