import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./components/Coins";
import IndividualCoin from "./components/IndividualCoin";
import Account from "./components/Account";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import Logo from "./components/Logo";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import LogoAnimation from "./components/LogoAnimation";
import useLocalStorage from "./hooks/useLocalStorage";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import "./styles/other.css";
import "./styles/styles.css";
import { baseURL } from "./config/index";

const initialRegisterFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  confirm: "",
};

const initialLoginFormValues = {
  username: "",
  password: "",
};

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);
  const [dark, setDark] = useLocalStorage("dark", false);
  const [searchValue, setSearchValue] = useState("");
  const [registerFormValues, setRegisterFormValues] = useState(initialRegisterFormValues);
  const [loginFormValues, setLoginFormValues] = useState(initialLoginFormValues);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [showLogoAnimation, setShowLogoAnimation] = useState(false);

  const navigate = useNavigate();

  const filteredSearch = () => {
    const sanitize = searchValue.trim().toLowerCase();
    if (!sanitize) return cryptoData;
    return cryptoData.filter((coin) => {
      return coin.name.toLowerCase().includes(sanitize);
    });
  };

  const register = () => {
    setRegisterMessage("Creating Account ...");
    if (window.localStorage.getItem("token")) {
      setRegisterMessage("Already logged in.");
      setTimeout(() => {
        navigate("/coins");
      }, 3000);
    } else {
      const request = {
        first_name: registerFormValues.first_name.trim(),
        last_name: registerFormValues.last_name.trim(),
        email: registerFormValues.email.trim(),
        username: registerFormValues.username.trim(),
        password: registerFormValues.password.trim(),
      };

      axios
        .post(`${baseURL}/register`, request)
        .then((res) => {
          setRegisterFormValues(initialRegisterFormValues);
          setRegisterMessage("Account Successfully Created!");
          setTimeout(() => {
            setRegisterMessage("");
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setRegisterMessage("");
          setRegisterError(err.response.data.message);
        });
    }
  };

  const login = () => {
    setLoginMessage("Logging In ...");
    if (window.localStorage.getItem("token")) {
      setLoginMessage("Already logged in");
      setTimeout(() => {
        navigate("/coins");
      }, 3000);
    } else {
      axios
        .post(`${baseURL}/login`, loginFormValues)
        .then((res) => {
          setLoginFormValues(initialLoginFormValues);
          setLoginMessage(res.data.message);
          window.localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            setLoginMessage("");
            navigate("/coins");
          }, 3000);
        })
        .catch((err) => {
          setLoginMessage("");
          setLoginError(err.response.data.message);
        });
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setCryptoData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {showLogoAnimation ? (
        <LogoAnimation setShowLogoAnimation={setShowLogoAnimation} />
      ) : (
        <div
          className={`min-h-[95vh] transition duration-300 ease ${
            dark ? "bg-[#000924]" : "bg-[#E9ECEE]"
          }`}
        >
          <nav
            className={`min-h-[100px] pt-5 flex justify-between items-center ${
              dark ? "text-white" : "text-black"
            }`}
          >
            <div className="w-11/12 mx-auto max-w-7xl flex justify-between items-center">
              <div>
                <Logo setShowLogoAnimation={setShowLogoAnimation} />
              </div>
              <div
                className={`hidden lg:flex lg:justify-between lg:items-center ${
                  window.localStorage.getItem("token") ? "lg:w-4/12" : "lg:w-5/12"
                }`}
              >
                <NavLink
                  className="py-[0.5em] px-[1em] rounded-[3em] transition duration-300 ease hover:text-[#52E6FA]"
                  to={window.localStorage.getItem("token") ? "/coins" : "/login"}
                >
                  Coins
                </NavLink>
                <NavLink
                  className="py-[0.5em] px-[1em] rounded-[3em] transition duration-300 ease hover:text-[#52E6FA]"
                  to={window.localStorage.getItem("token") ? "/account" : "/login"}
                >
                  Account
                </NavLink>
                {!window.localStorage.getItem("token") ? (
                  <>
                    <NavLink
                      className="py-[0.5em] px-[1em] rounded-[3em] transition duration-300 ease hover:text-[#52E6FA]"
                      to="/login"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      className={`py-2 px-4 rounded-2xl border-2 text-black ${
                        dark ? "hover:text-white" : ""
                      } border-[#52E6FA] bg-[#52E6FA] hover:bg-[#52E6FA4D] transition duration-300 ease`}
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className={`py-2 px-4 rounded-2xl text-black ${
                      dark ? "hover:text-white" : ""
                    } border-2 border-[#52E6FA] bg-[#52E6FA] hover:bg-[#52E6FA4D] transition duration-300 ease`}
                  >
                    Logout
                  </button>
                )}
                {dark ? (
                  <MdDarkMode
                    className="cursor-pointer ml-4"
                    fontSize={22}
                    onClick={() => setDark(false)}
                  />
                ) : (
                  <MdOutlineDarkMode
                    className="cursor-pointer ml-4"
                    fontSize={22}
                    onClick={() => setDark(true)}
                  />
                )}
              </div>
              <div className="lg:hidden">
                <HiMenuAlt4
                  fontSize={28}
                  className={`cursor-pointer ${dark ? "text-white" : "text-black"}`}
                  onClick={() => setToggleNav(true)}
                />
                {toggleNav && (
                  <div
                    id="nav-mobile"
                    className="glassmorphism text-white fixed top-0 right-0 pt-28 z-10 flex flex-col justify-start items-end w-[75vw] 
                h-screen shadow-2xl"
                  >
                    <div className="fixed top-11 right-[6%]">
                      <AiOutlineClose
                        fontSize={28}
                        className={`cursor-pointer ${dark ? "" : "text-white"}`}
                        onClick={() => setToggleNav(false)}
                      />
                    </div>
                    <div className="flex flex-col items-end pr-[6%] text-xl">
                      <NavLink
                        className="py-4"
                        to={window.localStorage.getItem("token") ? "/coins" : "/login"}
                        onClick={() => setToggleNav(false)}
                      >
                        Coins
                      </NavLink>
                      <NavLink
                        className="py-4"
                        to={window.localStorage.getItem("token") ? "/account" : "/login"}
                        onClick={() => setToggleNav(false)}
                      >
                        Account
                      </NavLink>
                      {!window.localStorage.getItem("token") ? (
                        <>
                          <NavLink className="py-4" to="/login" onClick={() => setToggleNav(false)}>
                            Login
                          </NavLink>
                          <NavLink
                            className="py-4"
                            to="/register"
                            onClick={() => setToggleNav(false)}
                          >
                            Register
                          </NavLink>
                        </>
                      ) : (
                        <button onClick={logout} className="py-4">
                          Logout
                        </button>
                      )}
                    </div>
                    <div className="mt-5 pr-[6%]">
                      {dark ? (
                        <MdDarkMode fontSize={28} onClick={() => setDark(false)} />
                      ) : (
                        <MdOutlineDarkMode fontSize={28} onClick={() => setDark(true)} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <Routes>
            <Route
              path="/coins"
              element={
                <ProtectedRoute>
                  <Coins
                    cryptoData={cryptoData}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    dark={dark}
                    filteredSearch={filteredSearch}
                    favoritesList={favoritesList}
                    setFavoritesList={setFavoritesList}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coins/:itemID"
              element={
                <ProtectedRoute>
                  <IndividualCoin dark={dark} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account logout={logout} dark={dark} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  loginFormValues={loginFormValues}
                  setLoginFormValues={setLoginFormValues}
                  login={login}
                  dark={dark}
                  loginError={loginError}
                  setLoginError={setLoginError}
                  loginMessage={loginMessage}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  registerFormValues={registerFormValues}
                  setRegisterFormValues={setRegisterFormValues}
                  register={register}
                  dark={dark}
                  registerError={registerError}
                  setRegisterError={setRegisterError}
                  registerMessage={registerMessage}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites dark={dark} />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home dark={dark} />} />
            <Route path="*" element={<ErrorPage dark={dark} />} />
          </Routes>
        </div>
      )}
      <footer
        className={`flex justify-center items-center min-h-[5vh] text-xs transition duration-300 ease ${
          dark ? "bg-[#000924] text-white" : "bg-[#E9ECEE] text-black"
        }`}
      >
        <p>Designed and Created By Joseph Fantuzzi 2022</p>
      </footer>
    </>
  );
}

export default App;
