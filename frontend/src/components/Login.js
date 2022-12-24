import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import LinearProgress from "@mui/material/LinearProgress";
import "../styles/other.css";

const Login = ({
  loginFormValues,
  setLoginFormValues,
  login,
  dark,
  loginError,
  setLoginError,
  loginMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = loginFormValues;

  const disabled = username && password ? false : true;

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginError("");
    login();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginFormValues({ ...loginFormValues, [name]: value });
  };

  return (
    <div className="outer-min-height py-20 flex justify-center items-center">
      <form
        className={`flex flex-col justify-between items-center border-2 my-8 px-8 py-10 rounded-3xl w-11/12 max-w-xl transition duration-300 ease ${
          dark ? "border-[#E9ECEE4D]" : "border-[#E9ECEE] bg-[#E9ECEE] shadow"
        }`}
        onSubmit={submitHandler}
      >
        <h1
          className={`text-2xl font-bold pb-5 transition duration-300 ease ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Login.
        </h1>
        <div className="w-full max-w-sm">
          <label
            className={`self-start text-xs py-2 transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2 focus:outline-none focus:ring focus:ring-[#52E6FA]"
          />
        </div>
        <div className="password-container max-w-sm">
          <label
            className={`self-start text-xs py-2 transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
            htmlFor="password"
          >
            Password
          </label>
          {showPassword ? (
            <MdVisibility
              className="password-icon"
              fontSize={22}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <MdVisibilityOff
              className="password-icon"
              fontSize={22}
              onClick={() => setShowPassword(true)}
            />
          )}
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 mb-2 focus:outline-none focus:ring focus:ring-[#52E6FA]"
            autoComplete="off"
          />
        </div>
        <button
          disabled={disabled}
          className={`${
            disabled
              ? "bg-gray-100 border-gray-100 cursor-not-allowed"
              : "hover:text-black hover:bg-[#E9ECEE]"
          } ${
            dark ? "border-[#E9ECEE4D]" : "shadow border-[#000924]"
          } border-2 bg-[#000924] text-white rounded-3xl py-2 my-8 w-full cursor-pointer max-w-sm transition duration-300 ease`}
          onClick={submitHandler}
        >
          Login
        </button>
        <div className="text-red-500 text-center font-bold pb-5">{loginError}</div>
        {loginMessage ? (
          <div className={dark ? "text-white" : "text-black"}>
            <div className="font-bold pb-3">{loginMessage}</div>
            <LinearProgress color="inherit" />
          </div>
        ) : (
          <div
            className={`text-center transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
          >
            <p>Don't Have An Account With Us?</p>
            <Link to="/register">
              <span className="underline cursor-pointer hover:text-[#52E6FA]">Register Now.</span>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
