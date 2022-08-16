import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import "./balance.css"

export default function Balance({ balance, onClick }) {
  return (
      <div className="balance white-box" onClick={onClick}>
        <FaMoneyBillWave />
        <span>$ {balance || "0"}</span>
      </div>
  );
}
