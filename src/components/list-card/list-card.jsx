import React from "react";
import "./list-card.css";
import { AiOutlineLoading } from "react-icons/ai";

export default function ListCard({ name, img, serie, value, className }) {
  return (
    <div className={`list-card ${className}`}>
      <div>
        <AiOutlineLoading />
        <img src={img} alt="" />
      </div>
      <h3>
        <strong>{name}</strong>
        <small>{serie}</small>
      </h3>
      <span className="white-box">$ {value}</span>
    </div>
  );
}
