import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import LinearProgress from "@mui/material/LinearProgress";
import "../styles/styles.css";
import "../styles/other.css";

const Login = ({
  loginFormValues,
  setLoginFormValues,
  login,
  toggleDark,
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
    <div className="outer-min-height flex justify-center items-center">
      <form
        className={`flex flex-col justify-between items-center my-8 px-8 py-10 rounded-3xl w-5/6 max-w-xl drop-shadow-2xl ${
          toggleDark ? "bg-gray-100" : "bg-gray-300"
        }`}
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-bold pb-5">Login.</h1>
        <div className="w-full max-w-sm">
          <label className="self-start text-xs py-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2"
          />
        </div>
        <div className="password-container max-w-sm">
          <label className="self-start text-xs py-2" htmlFor="password">
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
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 mb-2"
          />
        </div>
        <button
          disabled={disabled}
          className={`${
            disabled ? "bg-gray-100" : "bg-gray-800 hover:bg-gray-100 hover:text-black"
          } text-white rounded-lg py-2 my-8 w-full cursor-pointer max-w-sm drop-shadow-lg transition ease duration-500`}
          onClick={submitHandler}
        >
          Login
        </button>
        <div className="text-red-500 text-center font-bold pb-5">{loginError}</div>
        {loginMessage ? (
          <div>
            <div className="font-bold pb-3">{loginMessage}</div>
            <LinearProgress color="inherit" />
          </div>
        ) : (
          <div className="text-center">
            <p>Don't Have An Account With Us?</p>
            <Link to="/register">
              <span className="cursor-pointer transition ease duration-500 hover:text-white">
                Register Now.
              </span>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
