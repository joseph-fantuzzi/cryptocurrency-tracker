import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { FiMail } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import LinearProgress from "@mui/material/LinearProgress";
import axiosWithAuth from "../axios/index";
import "../styles/other.css";
import { baseURL } from "../config/index";

const initialFormValues = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const URL = `${baseURL}/change`;

const styles = {
  outerDiv: "outer-min-height w-11/12 max-w-7xl mx-auto flex flex-col justify-center items-center",
  h1: (dark) =>
    [
      "text-center pt-8 text-4xl font-semibold transition duration-300 ease",
      dark ? "text-white" : "text-black",
    ].join(" "),
  avatar: "flex flex-col justify-center items-center pt-10",
  avatarH1: "text-black font-bold text-3xl",
  innerDiv: "w-full flex flex-col items-center",
  infoDiv: (dark) =>
    [
      "w-full max-w-md flex flex-col mt-10 p-8 pt-10 rounded-2xl border-2 transition duration-300 ease",
      dark ? "text-white border-[#E9ECEE4D]" : "border-[#E9ECEE] shadow",
    ].join(" "),
  h2: "font-bold text-center pb-5",
  p: "pb-5",
  icon: "inline mr-3",
  changePswrdBtn: (dark) =>
    [
      "rounded-3xl border-2 text-white py-2 px-6 transition duration-300 ease hover:text-black hover:bg-[#E9ECEE]",
      dark ? "text-white" : "bg-[#000924] border-[#000924]",
    ].join(" "),
  updatePswrdBtnDisabled:
    "bg-gray-100 border-2 border-gray-100 mt-5 text-white rounded-3xl py-2 cursor-not-allowed",
  updatePswrdBtn: (dark) =>
    [
      "rounded-3xl border-2 text-white py-2 px-6 mt-5 transition duration-300 ease hover:text-black hover:bg-[#E9ECEE]",
      dark ? "text-white" : "bg-[#000924] border-[#000924]",
    ].join(" "),
  logoutBtn:
    "w-full max-w-md mt-8 py-2 px-4 rounded-2xl drop-shadow-lg bg-white hover:bg-[#52E6FA] transition duration-300 ease",
  form: "flex flex-col pt-5",
  input:
    "rounded-xl py-1 px-3 mb-3 w-full shadow-md text-black mt-1 focus:outline-none focus:ring focus:ring-[#52E6FA]",
  message: "text-red-500 text-center mt-5",
  success: "text-center my-3",
  label: "text-xs",
};

const Account = ({ logout, dark }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { current_password, new_password, confirm_password } = formValues;

  const disabled = current_password && new_password && confirm_password ? false : true;

  const token = window.localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const newPasswordHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (new_password === confirm_password) {
      axiosWithAuth()
        .put(URL, { ...formValues, username: decoded.username })
        .then((res) => {
          setSuccessMessage("Password successfully updated, logging out...");
          setFormValues(initialFormValues);
          setChangePassword(!changePassword);
          setTimeout(() => {
            logout();
          }, 3000);
        })
        .catch((err) => {
          setLoading(false);
          setMessage(err.response.data.message);
        });
    } else {
      setLoading(false);
      setMessage("Passwords Do Not Match");
    }
  };

  const changePasswordBtnHandler = () => {
    setChangePassword(!changePassword);
    setFormValues(initialFormValues);
    setMessage("");
  };

  return (
    <div className={styles.outerDiv}>
      <div>
        <h1 className={styles.h1(dark)}>
          {`${decoded.first_name} 
        ${decoded.last_name}`}
        </h1>
        <div className={styles.avatar}>
          <Avatar sx={{ bgcolor: "#52E6FA", width: 150, height: 150 }}>
            <h1 className={styles.avatarH1}>
              {decoded.first_name[0]}
              {decoded.last_name[0]}
            </h1>
          </Avatar>
        </div>
      </div>
      <div className={styles.innerDiv}>
        <div className={styles.infoDiv(dark)}>
          <h2 className={styles.h2}>Personal Information</h2>
          <p className={styles.p}>
            <BiUserCircle className={styles.icon} fontSize={24} />
            Username: {decoded.username}
          </p>
          <p className={styles.p}>
            <FiMail className={styles.icon} fontSize={24} />
            Email: {decoded.email}
          </p>
          <button onClick={changePasswordBtnHandler} className={styles.changePswrdBtn(dark)}>
            {changePassword ? "Cancel Changes" : "Change Password"}
          </button>
          {successMessage.length > 0 && <p className={styles.success}>{successMessage}</p>}
          {loading && <LinearProgress color="inherit" />}
          {changePassword && (
            <form className={styles.form} onSubmit={newPasswordHandler}>
              <div className="password-container">
                <label htmlFor="current_password" className={styles.label}>
                  Current Password
                </label>
                {showCurrentPassword ? (
                  <MdVisibility
                    className="password-icon-account"
                    fontSize={22}
                    onClick={() => setShowCurrentPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="password-icon-account"
                    fontSize={22}
                    onClick={() => setShowCurrentPassword(true)}
                  />
                )}
                <input
                  className={styles.input}
                  type={showCurrentPassword ? "text" : "password"}
                  id="current_password"
                  name="current_password"
                  value={formValues.current_password}
                  onChange={changeHandler}
                  autoComplete="off"
                />
              </div>
              <div className="password-container">
                <label htmlFor="new_password" className={styles.label}>
                  New Password
                </label>
                {showNewPassword ? (
                  <MdVisibility
                    className="password-icon-account"
                    fontSize={22}
                    onClick={() => setShowNewPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="password-icon-account"
                    fontSize={22}
                    onClick={() => setShowNewPassword(true)}
                  />
                )}
                <input
                  className={styles.input}
                  type={showNewPassword ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  value={formValues.new_password}
                  onChange={changeHandler}
                  autoComplete="off"
                />
              </div>
              <div className="password-container">
                <label htmlFor="confirm_password" className={styles.label}>
                  Confirm Password
                </label>
                {showConfirmPassword ? (
                  <MdVisibility
                    className="password-icon-account"
                    fontSize={22}
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="password-icon-account"
                    fontSize={22}
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
                <input
                  className={styles.input}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={formValues.confirm_password}
                  onChange={changeHandler}
                  autoComplete="off"
                />
              </div>
              <button
                disabled={disabled}
                className={disabled ? styles.updatePswrdBtnDisabled : styles.updatePswrdBtn(dark)}
              >
                Update Password
              </button>
              {message.length > 0 && <p className={styles.message}>{message}</p>}
            </form>
          )}
        </div>
        <button onClick={logout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
