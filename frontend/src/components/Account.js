import React from "react";
import jwt_decode from "jwt-decode";

const Account = () => {
  const token = window.localStorage.getItem("token");
  const decoded = jwt_decode(token);
  console.log(decoded);
  return <div>{`${decoded.first_name} ${decoded.last_name}'s Account`}</div>;
};

export default Account;
