import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "../styles/other.css";

const styles = {
  outerDiv: "outer-min-height flex flex-col justify-center items-center",
  innerDiv: "w-11/12 max-w-lg bg-gray-300 drop-shadow-2xl px-10 py-12 rounded-3xl",
  h1: "text-center text-red-500 font-bold text-3xl pb-8",
  btn: "text-center py-1 max-w-xs text-white flex items-center justify-center bg-gray-800 rounded-2xl w-7/8 mx-auto hover:drop-shadow-lg hover:bg-white hover:text-black transition duration-300 ease",
  p: "text-lg pr-2",
  icon: "",
};

const ErrorPage = () => {
  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        <h1 className={styles.h1}>404 Not Found</h1>
        <Link to="/">
          <div className={styles.btn}>
            <p className={styles.p}>Back to Home</p>
            <BiArrowBack fontSize={20} className={styles.icon} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
