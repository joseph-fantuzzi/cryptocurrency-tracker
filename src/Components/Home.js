import React from "react";
import "../Styles/styles.css";

const Home = ({ toggleDark }) => {
  return (
    <div>
      <h1 className={`font-bold text-center text-2xl md:text-9xl pt-10 ${toggleDark ? "text-white" : ""}`}>CRYPTOX</h1>
      <p className={`text-center text-2xl md:text-5xl ${toggleDark ? "text-white" : ""}`}>Meet the next generation of Cryptocurrency tracking software</p>
    </div>
  );
};

export default Home;
