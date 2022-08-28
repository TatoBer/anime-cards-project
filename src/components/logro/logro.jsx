import React from "react";
import "./logro.css";
import { GiBlackHandShield } from "react-icons/gi";

export default function Logro({ svg, children, completed, status, goal, claimed }) {
  return (
    <div className="logro">
      {svg || <GiBlackHandShield />}
      <h4>{children || "Texto del achievement"}</h4>
      <span>
        {!completed ? (
          <>
            <p>{status || 0}</p>
            <p>/{goal || 0}</p>
          </>
        ) : (
          !claimed ? <h6>CLAIM REWARD!</h6> : <h5>COMPLETED!</h5>
        )}
      </span>
    </div>
  );
}
