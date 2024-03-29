import React from "react";
import Button1 from "../../components/button1/button1";
import "./login.css"
import { BsGoogle, BsGithub } from 'react-icons/bs';
import {loginWithGitHub, loginWithGoogle, onAuthStateChanged} from '../../firebase/client'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import MainTittle from "../../components/main-tittle/main-tittle";
import useUser from "../../hooks/useUser";

export default function Login() {

  const {user} = useUser(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    } else if (user === null) {
      setTimeout(() => {
        document.querySelector(".loading-fullscreen").classList.add("off");
      }, 200);
    } 
  }, [user]);


  return (
    <div className="app">
      <MainTittle />
      <span className="login-span">
        <h2>Welcome! Log in and start collecting anime cards</h2>
      </span>
      <div className="login-div white-box">
        <Button1 onClick={loginWithGoogle} > LOGIN <BsGoogle /></Button1>
        <Button1 onClick={loginWithGitHub} > LOGIN <BsGithub /></Button1>
      </div>
      <LoadingFullscreen />
    </div>
  );
}
