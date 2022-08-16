import React from "react";
import { logOut } from "../../firebase/client";
import Button1 from "../button1/button1";
import "./log-out.css"

export default function LogOut() {

    const handleCancel = ()=>{
        document.querySelector(".logout-div").classList.add("off")
    }

  return (
    <div className="logout-div off">
      <div className="white-box">
        <strong>Are you sure?</strong>
        <Button1 onClick={logOut}>LOG OUT</Button1>
        <Button1 onClick={handleCancel}>CANCEL</Button1>
      </div>
    </div>
  );
}
