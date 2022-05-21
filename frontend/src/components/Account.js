import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { FiMail } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

const styles = {
  outerDiv: "min-h-83vh flex flex-col items-center",
  h1: "text-center pt-8 text-2xl font-semibold",
  avatar: "flex flex-col justify-center items-center pt-10",
  infoDiv: "flex flex-col mt-10 p-8 bg-gray-300 rounded-2xl w-5/6",
  h2: "font-bold text-center pb-5",
  p: "pb-5",
  icon: "inline mr-3",
  changePswrdBtn:
    "bg-gray-100 rounded-2xl py-2 hover:text-white hover:bg-black transition duration-300 ease",
  updatePswrdBtn:
    "w-5/6 bg-gray-100 rounded-2xl py-2 hover:text-white hover:bg-black transition duration-300 ease",
  logoutBtn:
    "bg-[#203C7A] w-5/6 my-20 py-2 px-4 text-white rounded-2xl hover:bg-gray-100 hover:text-black transition duration-300 ease",
};

const passwordChangeHandler = (e) => {
  e.preventDefault();
};

const Account = ({ logout }) => {
  const [changePassword, setChangePassword] = useState(false);

  const token = window.localStorage.getItem("token");
  const decoded = jwt_decode(token);
  return (
    <div className={styles.outerDiv}>
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
        <button
          onClick={() => setChangePassword(!changePassword)}
          className={styles.changePswrdBtn}
        >
          {changePassword ? "Cancel Changes" : "Change Password"}
        </button>
        {changePassword && (
          <form onSubmit={passwordChangeHandler}>
            <label htmlFor="current_password">Current Password:</label>
            <input type="password" id="current_password" />
            <label htmlFor="new_password">New Password:</label>
            <input type="password" id="new_password" />
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" />
            <button className={styles.updatePswrdBtn}>Update Password</button>
          </form>
        )}
      </div>
      <button onClick={logout} className={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

export default Account;
