import React, { useEffect } from "react";
import "../styles/styles.css";

const Search = ({ cryptoData, searchValue, setSearchValue, toggleDark }) => {
  useEffect(() => {
    setSearchValue("");
  }, [setSearchValue]);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className="w-11/12 max-w-7xl flex justify-end mx-auto items-center my-8">
      <label className={toggleDark ? "text-white" : ""} htmlFor="search">
        Search
      </label>
      <input
        className={`w-80 h-8 ml-3 px-3 py-1 drop-shadow-lg rounded-3xl border-2 
        ${toggleDark ? "bg-zinc-800 text-white" : "border-gray-800"}`}
        id="search"
        type="text"
        name="search"
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
