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
import useLocalStorage from "./hooks/useLocalStorage";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import "./styles/other.css";
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
  const [toggleDark, setToggleDark] = useLocalStorage("dark", false);
  const [searchValue, setSearchValue] = useState("");
  const [registerFormValues, setRegisterFormValues] = useState(initialRegisterFormValues);
  const [loginFormValues, setLoginFormValues] = useState(initialLoginFormValues);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);

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
      <div
        className={`min-h-[95vh] transition duration-500 ease ${
          toggleDark ? "bg-[#000924]" : "bg-[#E9ECEE]"
        }`}
      >
        <nav
          className={`min-h-[100px] flex justify-between items-center ${
            toggleDark ? "text-white" : "text-black"
          }`}
        >
          <div className="w-11/12 mx-auto max-w-7xl flex justify-between items-center">
            <div className="ml-5 lg:ml-0 relative top-5">
              <Logo />
            </div>
            <div className="hidden lg:w-1/2 lg:flex lg:justify-between lg:items-center">
              <NavLink
                className="py-[0.5em] px-[1em] rounded-[3em] transition duration-500 ease hover:text-[#52E6FA]"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="py-[0.5em] px-[1em] rounded-[3em] transition duration-500 ease hover:text-[#52E6FA]"
                to={window.localStorage.getItem("token") ? "/coins" : "/login"}
              >
                Coins
              </NavLink>
              <NavLink
                className="py-[0.5em] px-[1em] rounded-[3em] transition duration-500 ease hover:text-[#52E6FA]"
                to={window.localStorage.getItem("token") ? "/account" : "/login"}
              >
                My Account
              </NavLink>
              {!window.localStorage.getItem("token") ? (
                <>
                  <NavLink
                    className="py-[0.5em] px-[1em] rounded-[3em] transition duration-500 ease hover:text-[#52E6FA]"
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="py-2 px-4 rounded-2xl border-2 border-[#52E6FA] hover:bg-[#52E6FA] transition duration-500 ease"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="py-2 px-4 rounded-2xl border-2 border-[#52E6FA] hover:bg-[#52E6FA] transition duration-500 ease"
                >
                  Logout
                </button>
              )}
              {toggleDark ? (
                <MdDarkMode
                  className="cursor-pointer"
                  fontSize={22}
                  onClick={() => setToggleDark(false)}
                />
              ) : (
                <MdOutlineDarkMode
                  className="cursor-pointer"
                  fontSize={22}
                  onClick={() => setToggleDark(true)}
                />
              )}
            </div>
          </div>
          <div className="lg:hidden">
            {toggleNav ? (
              <AiOutlineClose
                fontSize={28}
                className={`cursor-pointer mr-10 ${toggleDark ? "text-white" : "text-black"}`}
                onClick={() => setToggleNav(false)}
              />
            ) : (
              <HiMenuAlt4
                fontSize={28}
                className={`cursor-pointer mr-10 ${toggleDark ? "text-white" : "text-black"}`}
                onClick={() => setToggleNav(true)}
              />
            )}
            {toggleNav && (
              <div
                id="nav-mobile"
                className="glassmorphism text-white fixed top-0 -right-2 p-5 z-10 flex flex-col justify-start items-end w-[70vw] 
                h-screen shadow-2xl rounded-md"
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
                    My Account
                  </NavLink>
                  {!window.localStorage.getItem("token") ? (
                    <>
                      <NavLink className="py-4" to="/login" onClick={() => setToggleNav(false)}>
                        Login
                      </NavLink>
                      <NavLink className="py-4" to="/register" onClick={() => setToggleNav(false)}>
                        Register
                      </NavLink>
                    </>
                  ) : (
                    <button onClick={logout} className="py-4">
                      Logout
                    </button>
                  )}
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
              <ProtectedRoute>
                <Coins
                  cryptoData={cryptoData}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  toggleDark={toggleDark}
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
                <IndividualCoin toggleDark={toggleDark} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account logout={logout} />
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
                toggleDark={toggleDark}
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
                toggleDark={toggleDark}
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
                <Favorites toggleDark={toggleDark} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home cryptoData={cryptoData} toggleDark={toggleDark} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <footer
        className={`flex justify-center items-center min-h-[5vh] text-xs transition duration-500 ease ${
          toggleDark ? "bg-[#000924] text-white" : "bg-[#E9ECEE] text-black"
        }`}
      >
        <p>Designed and Created By Joseph Fantuzzi 2022</p>
      </footer>
    </>
  );
}

export default App;
