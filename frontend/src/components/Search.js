import React, { useEffect } from "react";
import "../styles/styles.css";

const Search = ({ cryptoData, searchValue, setSearchValue, toggleDark }) => {
  const styles = {
    outerDiv: "w-11/12 max-w-7xl flex justify-end mx-auto items-center my-8",
    label: toggleDark ? "text-white" : "",
    input: `w-80 h-8 ml-3 px-3 py-1 drop-shadow-lg rounded-3xl border-2 
      ${toggleDark ? "bg-zinc-800 text-white" : "border-gray-800"}`,
  };

  useEffect(() => {
    setSearchValue("");
  }, [setSearchValue]);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className={styles.outerDiv}>
      <label className={styles.label} htmlFor="search">
        Search
      </label>
      <input
        className={styles.input}
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
