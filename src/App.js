import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";
import { Routes, Route, NavLink } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import "./Styles/other.css";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDark, setToggleDark] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCryptoData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={toggleDark ? "bg-zinc-800" : ""}>
      <nav
        className={toggleDark ? "bg-zinc-800 border-b-2 border-gray-50 text-white py-8 px-5 flex justify-between items-center" : "bg-gray-800 text-white py-8 px-5 flex justify-between items-center"}
      >
        <h1 className="text-2xl">Crypto Dashboard</h1>
        <div className="hidden md:w-1/2 md:flex md:justify-around md:items-center">
          <NavLink className="links" to="/">
            Home
          </NavLink>
          <NavLink className="links" to="/coins">
            Coins
          </NavLink>
          <NavLink className="links" to="/login">
            Login
          </NavLink>
          <NavLink className="links" to="/register">
            Register
          </NavLink>
          {toggleDark ? <MdDarkMode fontSize={20} onClick={() => setToggleDark(false)} /> : <MdOutlineDarkMode fontSize={20} onClick={() => setToggleDark(true)} />}
        </div>
        <div className="md:hidden">
          {toggleNav ? (
            <AiOutlineClose fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleNav(false)} />
          ) : (
            <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleNav(true)} />
          )}
          {toggleNav && (
            <div
              id="nav-mobile"
              className="fixed top-0 -right-2 p-5 z-10 flex flex-col justify-start items-end w-[70vw] h-screen shadow-2xl rounded-md 
            text-white blue-glassmorphism"
            >
              <div className="w-full">
                <AiOutlineClose fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleNav(false)} />
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
              <div className="pr-5 mt-5">
                {toggleDark ? <MdDarkMode fontSize={28} onClick={() => setToggleDark(false)} /> : <MdOutlineDarkMode fontSize={28} onClick={() => setToggleDark(true)} />}
              </div>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path="/coins"
          element={
            <div className="my-20">
              <div></div>
              {cryptoData.map((coin) => {
                return <Coin key={coin.id} coin={coin} />;
              })}
            </div>
          }
        />
      </Routes>
      <footer className={toggleDark ? "bg-zinc-800 text-white py-3 px-2 text-center text-xs" : "bg-gray-800 text-white py-3 px-2 text-center text-xs"}>
        <p>&copy; Designed by Joseph Fantuzzi 2022</p>
      </footer>
    </div>
  );
}

export default App;
