import React from "react";
import Spline from "@splinetool/react-spline";

const styles = {
  spline: "h-[53.2rem]",
};

const Toggle = ({ toggleDark, setToggleDark }) => {
  const onMouseDown = (e) => {
    if (e.target.id === "9cde739b-1960-407e-91d0-018ddd72549d") {
      setToggleDark(false);
    } else if (e.target.id === "6c9b2341-4ab0-42d6-a429-aa4524f97e01") {
      setToggleDark(true);
    }
  };

  return (
    <div className={styles.spline}>
      <Spline
        scene="https://prod.spline.design/GUI7AlModYxOfZiA/scene.splinecode"
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export default Toggle;
