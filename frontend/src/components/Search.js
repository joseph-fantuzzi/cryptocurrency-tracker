import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";
import "../styles/styles.css";

const Search = ({ cryptoData, searchValue, setSearchValue, toggleDark }) => {
  const styles = {
    outerDiv: "w-11/12 max-w-7xl flex justify-between mx-auto items-center my-8",
    label: toggleDark ? "text-white" : "",
    input: `w-80 h-8 ml-3 px-3 py-1 drop-shadow-lg rounded-3xl border-2 
      ${toggleDark ? "bg-zinc-800 text-white" : "border-gray-800"}`,
    favoriteBtn:
      "bg-gray-800 drop-shadow-md rounded-3xl text-white py-2 px-5 hover:bg-white hover:drop-shadow-lg hover:text-black transition duration-500 ease",
    favIcon: "inline ml-2",
  };

  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue("");
  }, [setSearchValue]);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const favoritesHandler = () => {
    navigate("/favorites");
  };

  return (
    <div className={styles.outerDiv}>
      <button className={styles.favoriteBtn} onClick={favoritesHandler}>
        Favorites List
        <FiArrowRightCircle fontSize={20} className={styles.favIcon} />
      </button>
      <div>
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
    </div>
  );
};

export default Search;
