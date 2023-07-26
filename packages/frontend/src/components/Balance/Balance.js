import React from "react";

const Balance = ({ balance }) => {
  return (
    <div>
      <h1>Your Balance</h1>
      <p>{balance !== null ? balance : "Loading..."}</p>
    </div>
  );
};

export default Balance;