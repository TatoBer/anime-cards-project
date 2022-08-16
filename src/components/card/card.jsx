import React from "react";
import "./card.css"
import { AiOutlineLoading } from "react-icons/ai";

export default function Card({name, img, serie, value, className}) {
  return (
    <div className={`card ${className}`}>
      <div>
      <AiOutlineLoading />
        <img
          src={img}
          alt=""
        />
        <span className="white-box">$ {value}</span>
      </div>
      <strong>{name}</strong>
      <p>{serie}</p>
    </div>
  );
}
