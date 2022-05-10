import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import "../styles/styles.css";
import "../styles/other.css";

const Register = ({ registerFormValues, setRegisterFormValues, submit, toggleDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterFormValues({ ...registerFormValues, [name]: value });
  };

  return (
    <div className="w-full flex justify-center items-center min-h-83vh">
      <form
        className={`flex flex-col justify-between items-center my-5 px-8 py-10 rounded-3xl w-5/6 max-w-xl drop-shadow-2xl ${
          toggleDark ? "bg-gray-100" : "bg-gray-300"
        }`}
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-bold pb-5">Register.</h1>
        <div className="w-full max-w-sm">
          <label className="self-start text-xs pb-2" htmlFor="fname">
            First Name
          </label>
          <input
            id="fname"
            type="text"
            name="fname"
            value={registerFormValues.fname}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2"
          />
        </div>
        <div className="w-full max-w-sm">
          <label className="self-start text-xs py-2" htmlFor="lname">
            Last Name
          </label>
          <input
            id="lname"
            type="text"
            name="lname"
            value={registerFormValues.lname}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2"
          />
        </div>
        <div className="w-full max-w-sm">
          <label className="self-start text-xs py-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={registerFormValues.email}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 max-w-sm mb-2"
          />
        </div>
        <div className="w-full max-w-sm">
          <label className="self-start text-xs py-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={registerFormValues.username}
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
            value={registerFormValues.password}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 mb-2"
          />
        </div>
        <div className="password-container max-w-sm">
          <label className="self-start text-xs py-2" htmlFor="password">
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
            value={registerFormValues.confirm}
            onChange={changeHandler}
            className="text-black w-full rounded-xl drop-shadow-md py-0.5 px-2 mb-2"
          />
        </div>
        <button
          className="bg-gray-800 text-white rounded-lg py-2 my-8 w-full cursor-pointer max-w-sm drop-shadow-lg transition ease duration-500 hover:bg-gray-100 hover:text-black"
          onClick={submitHandler}
        >
          Create Account
        </button>
        <p>Have An Account With Us?</p>
        <Link to="/login">
          <span className="cursor-pointer transition ease duration-500 hover:text-white">
            Login Now.
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
