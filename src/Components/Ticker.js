import React from "react";

const Ticker = ({ ticker }) => {
  return (
    <div>
      <p>
        {ticker.base}/{ticker.target}
      </p>
    </div>
  );
};

export default Ticker;
