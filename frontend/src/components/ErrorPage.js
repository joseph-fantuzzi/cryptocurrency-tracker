import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "../styles/other.css";

const styles = {
  outerDiv: "py-10 outer-min-height flex flex-col justify-center items-center",
  innerDiv: (dark) =>
    [
      "w-11/12",
      "max-w-lg",
      "px-10",
      "py-12",
      "rounded-3xl",
      "transition duration-300 ease",
      dark ? "border-2 border-[#E9ECEE4D]" : "shadow bg-[#E9ECEE]",
    ].join(" "),
  h1: "text-center text-red-500 font-bold text-3xl pb-8",
  btn: (dark) =>
    [
      "text-center border-2 py-2 text-white flex items-center justify-center bg-[#000924] rounded-3xl w-1/2 min-w-[130px] mx-auto hover:bg-[#E9ECEE] hover:text-black transition duration-300 ease",
      dark ? "border-[#E9ECEE4D]" : "shadow border-[#000924]",
    ].join(" "),
  p: "text-lg pr-2",
  icon: "",
};

const ErrorPage = ({ dark }) => {
  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv(dark)}>
        <h1 className={styles.h1}>404 Not Found</h1>
        <Link to="/">
          <div className={styles.btn(dark)}>
            <p className={styles.p}>Home</p>
            <BiArrowBack fontSize={20} className={styles.icon} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
