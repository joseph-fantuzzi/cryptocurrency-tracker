import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";

const Search = ({ cryptoData, searchValue, setSearchValue, dark }) => {
  const styles = {
    outerDiv:
      "w-11/12 max-w-7xl flex flex-col justify-between mx-auto items-center mb-8 mt-16 sm:flex-row",
    label: `transition duration-300 ease ${dark ? "text-white" : ""}`,
    input: `w-full max-w-xs min-w-[140px] ml-3 px-3 py-1 rounded-3xl border-2 transition duration-300 ease 
      ${dark ? "border-white text-white bg-[#000924]" : "border-black bg-[#E9ECEE]"}`,
    search: "w-4/6 flex items-center justify-end mt-8 sm:mt-0",
    favoriteBtn: `rounded-3xl text-white py-2 px-5 hover:drop-shadow-lg transition duration-300 ease ${
      dark ? "text-black bg-[#E9ECEE]" : "bg-[#000924]"
    }`,
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
      <div className={styles.search}>
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
