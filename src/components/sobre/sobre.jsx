import React from "react";
import "./sobre.css";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

export default function Sobre({
  bg,
  children,
  price,
  dis,
  click,
  buton,
  free,
}) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
  }

  return (
    <div className="sobre" style={{ background: bg }}>
      <div>
        {buton ? (
          free ? (
            free.time > 0 ? (
              <button
                price={0}
                disabled={true}
                style={{ background: bg }}
              >
                {convertHMS(free.time)}
              </button>
            ) : (
              <button
                price={0}
                onClick={click}
                disabled={false}
                style={{ background: bg }}
              >
                FREE
              </button>
            )
          ) : (
            <button
              price={price}
              onClick={click}
              disabled={!dis}
              style={{ background: bg }}
            >
              ${numberWithCommas(Number(price))}
            </button>
          )
        ) : (
          <AiOutlineLoading className="loading" />
        )}
        <FaQuestionCircle className="info" />
      </div>
      <span>
        <span>{children}</span>
      </span>
    </div>
  );
}
