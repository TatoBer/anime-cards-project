import React from "react";
import "./order-selection.css";

export default function OrderSelection({ order, setOrder }) {

  const changeOrderByValueDesc = () => {
    setOrder("VALUE DESC.");
    document.querySelector(".order-selection").classList.add("off")
  };
  const changeOrderByValueAsc = () => {
    setOrder("VALUE ASC.");
    document.querySelector(".order-selection").classList.add("off")
  };
  const changeOrderByStarsDesc = () => {
    setOrder("STARS DESC.");
    document.querySelector(".order-selection").classList.add("off")
  };
  const changeOrderByStarsAsc = () => {
    setOrder("STARS ASC.");
    document.querySelector(".order-selection").classList.add("off")
  };
  const changeOrderByDateDesc = () => {
    setOrder("DATE DESC.");
    document.querySelector(".order-selection").classList.add("off")
  };
  const changeOrderByDateAsc = () => {
    setOrder("DATE ASC.");
    document.querySelector(".order-selection").classList.add("off")
  };
  const changeOrderByRarity = () => {
    setOrder("RARITY");
    document.querySelector(".order-selection").classList.add("off")
  };

  return (
    <span className="order-selection off">
      <button onClick={changeOrderByValueDesc}>VALUE DESC.</button>
      <button onClick={changeOrderByValueAsc}>VALUE ASC.</button>
      <button onClick={changeOrderByStarsDesc}>STARS DESC.</button>
      <button onClick={changeOrderByStarsAsc}>STARS ASC.</button>
      <button onClick={changeOrderByDateDesc}>DATE DESC.</button>
      <button onClick={changeOrderByDateAsc}>DATE ASC.</button>
      <button onClick={changeOrderByRarity}>RARITY</button>
    </span>
  );
}
