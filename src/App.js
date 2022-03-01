import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";
import Search from "./Components/Search";
import Home from "./Components/Home";
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
  const [searchValue, setSearchValue] = useState("");

  const filteredSearch = () => {
    const sanitize = searchValue.trim().toLowerCase();
    if (!sanitize) return cryptoData;
    return cryptoData.filter((coin) => {
      return coin.name.toLowerCase().includes(sanitize);
    });
  };

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCryptoData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={`min-h-screen ${toggleDark ? "bg-zinc-800" : ""}`}>
      <nav className={`border-b-2 border-gray-50 text-white py-8 px-5 flex justify-between items-center ${toggleDark ? "bg-zinc-800" : "bg-gray-800"}`}>
        <h1 className="text-2xl pl-6 font-bold">CRYPTOX</h1>
        <div className="hidden md:w-2/3 md:flex md:justify-around md:items-center">
          <NavLink className="links" to="/">
            Home
          </NavLink>
          <NavLink className="links" to="/coins">
            Coins
          </NavLink>
          <NavLink className="links" to="/portfolio">
            My Portfolio
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
              className={
                toggleDark
                  ? "fixed top-0 -right-2 p-5 z-10 flex flex-col justify-start items-end w-[70vw] h-screen shadow-2xl rounded-md text-black black-glassmorphism"
                  : "fixed top-0 -right-2 p-5 z-10 flex flex-col justify-start items-end w-[70vw] h-screen shadow-2xl rounded-md text-white blue-glassmorphism"
              }
            >
              <div className="w-full">
                <AiOutlineClose fontSize={28} className={`cursor-pointer ${toggleDark ? "" : "text-white"}`} onClick={() => setToggleNav(false)} />
              </div>
              <div className="flex flex-col items-end text-2xl pr-5">
                <NavLink className="py-4" to="/" onClick={() => setToggleNav(false)}>
                  Home
                </NavLink>
                <NavLink className="py-4" to="/coins" onClick={() => setToggleNav(false)}>
                  Coins
                </NavLink>
                <NavLink className="py-4" to="/portfolio" onClick={() => setToggleNav(false)}>
                  My Portfolio
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
            <div className="mb-10">
              <Search cryptoData={cryptoData} searchValue={searchValue} setSearchValue={setSearchValue} toggleDark={toggleDark} />
              <div
                className={
                  toggleDark
                    ? "hidden md:grid max-w-7xl bg-neutral-900 w-11/12 text-sm text-white text-center mx-auto my-8 px-3 py-5 grid-cols-5 grid-rows-1 flex items-center rounded-xl drop-shadow-lg"
                    : "hidden md:grid max-w-7xl bg-slate-800 w-11/12 text-sm text-white text-center mx-auto my-8 px-3 py-5 grid-cols-5 grid-rows-1 flex items-center rounded-xl drop-shadow-lg"
                }
              >
                <h1>Market Cap Rank</h1>
                <h1>Currency</h1>
                <h1>Symbol</h1>
                <h1>Price</h1>
                <h1>Market Cap</h1>
              </div>
              {filteredSearch().map((coin) => {
                return <Coin key={coin.id} coin={coin} toggleDark={toggleDark} />;
              })}
            </div>
          }
        />
        <Route path="/" element={<Home toggleDark={toggleDark} />} />
      </Routes>
      {filteredSearch().length === 0 ? (
        <div className={`text-center mb-auto ${toggleDark ? "text-white" : ""}`}>
          <p>No results for "{searchValue}".</p>
        </div>
      ) : (
        ""
      )}
      <footer className={`fixed bottom-0 w-full text-white py-3 text-center text-xs ${toggleDark ? "bg-zinc-800" : "bg-gray-800"}`}>
        <p>&copy; Designed by Joseph Fantuzzi 2022</p>
      </footer>
    </div>
  );
}

export default App;
