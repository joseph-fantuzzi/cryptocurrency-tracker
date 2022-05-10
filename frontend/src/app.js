import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./components/Coin";
import IndividualCoin from "./components/IndividualCoin";
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, NavLink } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles/other.css";

const initialRegisterFormValues = {
  fname: "",
  lname: "",
  email: "",
  username: "",
  password: "",
  confirm: "",
};

const initialLoginFormValues = {
  email: "",
  password: "",
};

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDark, setToggleDark] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [registerFormValues, setRegisterFormValues] = useState(initialRegisterFormValues);
  const [loginFormValues, setLoginFormValues] = useState(initialLoginFormValues);

  const filteredSearch = () => {
    const sanitize = searchValue.trim().toLowerCase();
    if (!sanitize) return cryptoData;
    return cryptoData.filter((coin) => {
      return coin.name.toLowerCase().includes(sanitize);
    });
  };

  const submit = () => {};

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCryptoData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className={toggleDark ? "bg-zinc-800" : ""}>
        <nav
          className={`border-b-2 border-gray-50 text-white px-5 h-12vh min-h-60px flex justify-between items-center ${
            toggleDark ? "bg-zinc-800" : "bg-gray-800"
          }`}
        >
          <h1 className="text-2xl pl-6 font-bold">CRYPTOX.</h1>
          <div className="hidden md:w-2/3 md:flex md:justify-around md:items-center">
            <NavLink className="links" to="/">
              Home
            </NavLink>
            <NavLink className="links" to="/coins">
              Coins
            </NavLink>
            <NavLink className="links" to="/portfolio">
              Portfolio
            </NavLink>
            <NavLink className="links" to="/login">
              Login
            </NavLink>
            <NavLink
              className="bg-gray-100 py-2 px-4 text-black rounded-2xl hover:bg-gray-400 hover:text-white transition duration-300 ease"
              to="/register"
            >
              Register
            </NavLink>
            {toggleDark ? (
              <MdDarkMode fontSize={20} onClick={() => setToggleDark(false)} />
            ) : (
              <MdOutlineDarkMode fontSize={20} onClick={() => setToggleDark(true)} />
            )}
          </div>
          <div className="md:hidden">
            {toggleNav ? (
              <AiOutlineClose
                fontSize={28}
                className="text-white cursor-pointer"
                onClick={() => setToggleNav(false)}
              />
            ) : (
              <HiMenuAlt4
                fontSize={28}
                className="text-white cursor-pointer"
                onClick={() => setToggleNav(true)}
              />
            )}
            {toggleNav && (
              <div
                id="nav-mobile"
                className={`fixed top-0 -right-2 p-5 z-10 flex flex-col justify-start items-end w-[70vw] 
                h-screen shadow-2xl rounded-md ${
                  toggleDark ? "black-glassmorphism text-black" : "text-white blue-glassmorphism"
                }`}
              >
                <div className="w-full">
                  <AiOutlineClose
                    fontSize={28}
                    className={`cursor-pointer ${toggleDark ? "" : "text-white"}`}
                    onClick={() => setToggleNav(false)}
                  />
                </div>
                <div className="flex flex-col items-end text-2xl pr-5">
                  <NavLink className="py-4" to="/" onClick={() => setToggleNav(false)}>
                    Home
                  </NavLink>
                  <NavLink className="py-4" to="/coins" onClick={() => setToggleNav(false)}>
                    Coins
                  </NavLink>
                  <NavLink className="py-4" to="/portfolio" onClick={() => setToggleNav(false)}>
                    Portfolio
                  </NavLink>
                  <NavLink className="py-4" to="/login" onClick={() => setToggleNav(false)}>
                    Login
                  </NavLink>
                  <NavLink className="py-4" to="/register" onClick={() => setToggleNav(false)}>
                    Register
                  </NavLink>
                </div>
                <div className="pr-5 mt-5">
                  {toggleDark ? (
                    <MdDarkMode fontSize={28} onClick={() => setToggleDark(false)} />
                  ) : (
                    <MdOutlineDarkMode fontSize={28} onClick={() => setToggleDark(true)} />
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
        <Routes>
          <Route
            path="/coins"
            element={
              <div className="min-h-83vh">
                <div className="pb-10 pt-1">
                  <Search
                    cryptoData={cryptoData}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    toggleDark={toggleDark}
                  />
                  <div
                    className={`hidden md:grid max-w-7xl w-11/12 text-sm text-white text-center mx-auto 
                    my-8 px-3 py-5 grid-cols-5 grid-rows-1
                    flex items-center rounded-xl drop-shadow-lg ${
                      toggleDark ? "bg-neutral-900" : "bg-slate-800"
                    }`}
                  >
                    <h1>Market Cap Rank</h1>
                    <h1>Currency</h1>
                    <h1>Symbol</h1>
                    <h1>Price</h1>
                    <h1>Market Cap</h1>
                  </div>
                  {cryptoData ? (
                    filteredSearch().map((coin) => {
                      return <Coin key={coin.id} coin={coin} toggleDark={toggleDark} />;
                    })
                  ) : (
                    <div className="text-4xl flex flex-col justify-center items-center">
                      <h1 className={toggleDark ? "text-white" : ""}>Loading...</h1>
                      <CircularProgress size={100} style={{ margin: "1em" }} />
                    </div>
                  )}
                </div>
                {filteredSearch().length === 0 && cryptoData.length !== 0 ? (
                  <div className={`text-center mb-auto ${toggleDark ? "text-white" : ""}`}>
                    <p>No results for "{searchValue}".</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            }
          />
          <Route path="/coins/:itemID" element={<IndividualCoin toggleDark={toggleDark} />} />
          <Route
            path="/login"
            element={
              <Login
                loginFormValues={loginFormValues}
                setLoginFormValues={setLoginFormValues}
                submit={submit}
                toggleDark={toggleDark}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                registerFormValues={registerFormValues}
                setRegisterFormValues={setRegisterFormValues}
                submit={submit}
                toggleDark={toggleDark}
              />
            }
          />
          <Route path="/" element={<Home cryptoData={cryptoData} toggleDark={toggleDark} />} />
        </Routes>
      </div>
      <footer
        className={`flex justify-center items-center text-white h-5vh min-h-30px text-xs ${
          toggleDark ? "bg-zinc-800" : "bg-gray-800"
        }`}
      >
        <p>&copy; Designed by Joseph Fantuzzi 2022</p>
      </footer>
    </>
  );
}

export default App;
