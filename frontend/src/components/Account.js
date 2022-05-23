import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { FiMail } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import LinearProgress from "@mui/material/LinearProgress";
import axiosWithAuth from "../axios/index";

const styles = {
  outerDiv: "min-h-83vh flex flex-col lg-flex-row items-center",
  h1: "text-center pt-8 text-2xl font-semibold",
  avatar: "flex flex-col justify-center items-center pt-10",
  infoDiv: "max-w-md flex flex-col mt-10 p-8 pt-10 bg-gray-300 shadow-lg rounded-2xl w-5/6",
  h2: "font-bold text-center pb-5",
  p: "pb-5",
  icon: "inline mr-3",
  changePswrdBtn:
    "bg-black text-white rounded-2xl mt-5 py-2 shadow-md hover:text-black hover:bg-gray-100 transition duration-300 ease",
  updatePswrdBtnDisabled: "bg-gray-100 mt-5 text-white shadow-md rounded-2xl py-2",
  updatePswrdBtn:
    "bg-black mt-5 text-white rounded-2xl shadow-md py-2 hover:text-black hover:bg-gray-100 transition duration-300 ease",
  logoutBtn:
    "max-w-md bg-[#203C7A] w-5/6 my-20 py-2 px-4 text-white rounded-2xl shadow-lg hover:bg-gray-100 hover:text-black transition duration-300 ease",
  form: "flex flex-col pt-5",
  input: "rounded-xl py-1 px-3 mb-3 w-full shadow-md",
  message: "text-red-500 text-center mt-5",
  success: "text-green-800 text-center my-3",
};

const initialFormValues = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const URL = "http://localhost:9000/api/users/change";

const Account = ({ logout }) => {
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
    if (new_password === confirm_password) {
      axiosWithAuth()
        .put(URL, { ...formValues, username: decoded.username })
        .then((res) => {
          setSuccessMessage("Password successfully updated, logging out...");
          setLoading(!loading);
          setFormValues(initialFormValues);
          setChangePassword(!changePassword);
          setTimeout(() => {
            logout();
          }, 3000);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    } else setMessage("Passwords Do Not Match");
  };

  const changePasswordBtnHandler = () => {
    setChangePassword(!changePassword);
    setFormValues(initialFormValues);
    setMessage("");
  };

  return (
    <div className={styles.outerDiv}>
      <div>
        <h1 className={styles.h1}>
          {`${decoded.first_name} 
        ${decoded.last_name}`}
        </h1>
        <div className={styles.avatar}>
          <Avatar sx={{ bgcolor: "#203C7A", width: 100, height: 100 }}>
            {decoded.first_name[0]}
            {decoded.last_name[0]}
          </Avatar>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className={styles.infoDiv}>
          <h2 className={styles.h2}>Personal Information</h2>
          <p className={styles.p}>
            <BiUserCircle className={styles.icon} fontSize={24} />
            Username: {decoded.username}
          </p>
          <p className={styles.p}>
            <FiMail className={styles.icon} fontSize={24} />
            Email: {decoded.email}
          </p>
          <button onClick={changePasswordBtnHandler} className={styles.changePswrdBtn}>
            {changePassword ? "Cancel Changes" : "Change Password"}
          </button>
          <p className={styles.success}>{successMessage}</p>
          {loading && <LinearProgress color="inherit" />}
          {changePassword && (
            <form className={styles.form} onSubmit={newPasswordHandler}>
              <div className="password-container">
                <label htmlFor="current_password">Current Password</label>
                {showCurrentPassword ? (
                  <MdVisibility
                    className="password-icon"
                    fontSize={22}
                    onClick={() => setShowCurrentPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="password-icon"
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
                />
              </div>
              <div className="password-container">
                <label htmlFor="new_password">New Password</label>
                {showNewPassword ? (
                  <MdVisibility
                    className="password-icon"
                    fontSize={22}
                    onClick={() => setShowNewPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="password-icon"
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
                />
              </div>
              <div className="password-container">
                <label htmlFor="confirm_password">Confirm Password</label>
                {showConfirmPassword ? (
                  <MdVisibility
                    className="password-icon"
                    fontSize={22}
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="password-icon"
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
                />
              </div>
              <button
                disabled={disabled}
                className={disabled ? styles.updatePswrdBtnDisabled : styles.updatePswrdBtn}
              >
                Update Password
              </button>
              <p className={styles.message}>{message}</p>
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
