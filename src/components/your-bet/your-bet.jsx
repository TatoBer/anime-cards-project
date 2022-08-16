import React from "react";
import "./your-bet.css";

export default function YourBet({ onChange, max }) {
  return (
    <div className="your-bet white-box">
      <div>
        <span onClick={max}>MAX</span>
        <h4>YOUR BET</h4>
      </div>
      <input type="number" name="bet" placeholder="0" onChange={onChange} />
    </div>
  );
}
