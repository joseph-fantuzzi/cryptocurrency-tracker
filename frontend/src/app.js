import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./components/Coins";
import IndividualCoin from "./components/IndividualCoin";
import Account from "./components/Account";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import "./styles/other.css";

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

const baseURL = "http://localhost:9000/api/users";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDark, setToggleDark] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [registerFormValues, setRegisterFormValues] = useState(initialRegisterFormValues);
  const [loginFormValues, setLoginFormValues] = useState(initialLoginFormValues);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);

  const navigate = useNavigate();

  const filteredSearch = () => {
    const sanitize = searchValue.trim().toLowerCase();
    if (!sanitize) return cryptoData;
    return cryptoData.filter((coin) => {
      return coin.name.toLowerCase().includes(sanitize);
    });
  };

  const register = () => {
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
        setProfileSuccess(true);
        setTimeout(() => {
          setProfileSuccess(false);
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setRegisterError(err.response.data.message);
      });
  };

  const login = () => {
    axios
      .post(`${baseURL}/login`, loginFormValues)
      .then((res) => {
        setLoginFormValues(initialLoginFormValues);
        setLoginMessage(res.data.message);
        window.localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          setLoginMessage("");
          navigate("/coins");
        }, 2000);
      })
      .catch((err) => {
        setLoginError(err.response.data.message);
      });
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

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
            <NavLink
              className="links"
              to={window.localStorage.getItem("token") ? "/coins" : "/login"}
            >
              Coins
            </NavLink>
            <NavLink
              className="links"
              to={window.localStorage.getItem("token") ? "/account" : "/login"}
            >
              My Account
            </NavLink>
            {!window.localStorage.getItem("token") ? (
              <>
                <NavLink className="links" to="/login">
                  Login
                </NavLink>
                <NavLink
                  className="bg-gray-100 py-2 px-4 text-black rounded-2xl hover:bg-gray-400 hover:text-white transition duration-300 ease"
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-gray-100 py-2 px-4 text-black rounded-2xl hover:bg-gray-400 hover:text-white transition duration-300 ease"
              >
                Logout
              </button>
            )}
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
              <Coins
                cryptoData={cryptoData}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                toggleDark={toggleDark}
                filteredSearch={filteredSearch}
              />
            }
          />
          <Route path="/coins/:itemID" element={<IndividualCoin toggleDark={toggleDark} />} />
          <Route path="/account" element={<Account logout={logout} />} />
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
                profileSuccess={profileSuccess}
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
