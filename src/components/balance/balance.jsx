import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import "./balance.css"

export default function Balance({ balance, onClick }) {

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
      <div className="balance white-box" onClick={onClick}>
        <FaMoneyBillWave />
        <span>$ {numberWithCommas(Number(balance)) || "0"}</span>
      </div>
  );
}
