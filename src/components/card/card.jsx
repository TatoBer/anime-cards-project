import React from "react";
import "./card.css"
import { AiOutlineLoading, AiFillStar } from "react-icons/ai";

export default function Card({name, img, serie, value, className, legendary, repeated, stars, update, earn}) {

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <div className={`card ${className} ${legendary ? "legendary" : ""}`}>
      <div>
      <AiOutlineLoading />
        <img
          src={img}
          alt=""
        />
        <span className="white-box">$ {numberWithCommas(Number(value))}</span>
        { !repeated ? <div className="new">NEW!</div> : <div className="stars">{stars}<AiFillStar/></div> }
        { earn && (earn !== 0 && <div className="earns">+ ${numberWithCommas(Number(earn))}</div>) }
        { update && <div className="update">UPGRADED!</div> }
      </div>
      <strong>{name}</strong>
      <p>{serie}</p>
    </div>
  );
}
