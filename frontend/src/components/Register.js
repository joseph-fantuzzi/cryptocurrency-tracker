import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import LinearProgress from "@mui/material/LinearProgress";
import "../styles/other.css";

const Register = ({
  registerFormValues,
  setRegisterFormValues,
  register,
  dark,
  registerError,
  setRegisterError,
  registerMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { first_name, last_name, email, username, password, confirm } = registerFormValues;

  const disabled =
    first_name && last_name && email && username && password && confirm ? false : true;

  const submitHandler = (e) => {
    e.preventDefault();
    setRegisterError("");
    if (password === confirm) {
      register();
    } else {
      setRegisterError("Passwords Do Not Match");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterFormValues({ ...registerFormValues, [name]: value });
  };

  return (
    <div className="outer-min-height py-10 flex justify-center items-center">
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
          Register.
        </h1>
        <div className="w-full max-w-sm">
          <label
            className={`self-start text-xs py-2 transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={changeHandler}
            data-testid="fname-input"
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2 focus:outline-none focus:ring focus:ring-[#52E6FA]"
          />
        </div>
        <div className="w-full max-w-sm">
          <label
            className={`self-start text-xs py-2 transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={changeHandler}
            data-testid="lname-input"
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2 focus:outline-none focus:ring focus:ring-[#52E6FA]"
          />
        </div>
        <div className="w-full max-w-sm">
          <label
            className={`self-start text-xs py-2 transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            data-testid="email-input"
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2 focus:outline-none focus:ring focus:ring-[#52E6FA]"
          />
        </div>
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
            data-testid="username-input"
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
            data-testid="password-input"
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 mb-2 focus:outline-none focus:ring focus:ring-[#52E6FA]"
            autoComplete="off"
          />
        </div>
        <div className="password-container max-w-sm">
          <label
            className={`self-start text-xs py-2 transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
            htmlFor="confirm"
          >
            Confirm Password
          </label>
          {showConfirm ? (
            <MdVisibility
              className="password-icon"
              fontSize={22}
              onClick={() => setShowConfirm(false)}
            />
          ) : (
            <MdVisibilityOff
              className="password-icon"
              fontSize={22}
              onClick={() => setShowConfirm(true)}
            />
          )}
          <input
            id="confirm"
            type={showConfirm ? "text" : "password"}
            name="confirm"
            value={confirm}
            onChange={changeHandler}
            data-testid="confirm-input"
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
          Create Account
        </button>
        <div className="text-red-500 text-center font-bold pb-5" data-testid="errorMsg">
          {registerError}
        </div>
        {registerMessage ? (
          <div className={dark ? "text-white" : "text-black"}>
            <div className="text-center font-bold pb-3">{registerMessage}</div>
            <LinearProgress color="inherit" />
          </div>
        ) : (
          <div
            className={`text-center transition duration-300 ease ${
              dark ? "text-white" : "text-black"
            }`}
          >
            <p>Have An Account With Us?</p>
            <Link to="/login">
              <span className="underline cursor-pointer hover:text-[#52E6FA]">Login Now.</span>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
