import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { GiDiceFire, GiAchievement } from "react-icons/gi";
import { MdOutlineQueryStats, MdCollectionsBookmark } from "react-icons/md";
import "../../components/home-nav/home-nav.css";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import "./home.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  getAllPjs,
  onAuthStateChanged,
} from "../../firebase/client";
import { useNavigate, Link } from "react-router-dom";
import Navigator from "../../components/navigator/navigator";
import Balance from "../../components/balance/balance";
import Button1 from "../../components/button1/button1";
import Button3 from "../../components/button3/button3";
import { createPj2, createUserInfo2, getAllPjs2, getUserInfo2, updateUserInfo2 } from "../../api-requests/requests";
import { navOff } from "../../components/navigator/functions";

export default function Home() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user) {
      getUserInfo2(user.uid).then(res => {
        if (!res) {
          createUserInfo2(user.uid).then(()=>{
            getUserInfo2(user.uid).then(res=>{
              setUserInfo(res);
             })
          })
        } else {
          setUserInfo(res);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        document.querySelector(".loading-fullscreen").classList.add("off");
      }, 200);
    }
  }, [userInfo]);

  const addBalance = () => {
    updateUserInfo2(user.uid, {balance: userInfo.balance+1000}).then(()=>{
      getUserInfo2(user.uid).then(res=>setUserInfo(res))
    })
  };

  const goToCollection = (e)=>{
    e.preventDefault()
    navigate("/collection")
  }
  const goToStats = (e)=>{
    e.preventDefault()
    navigate("/stats")
  }
  const goToAchievements = (e)=>{
    e.preventDefault()
    navigate("/achievements")
  }


  return (
    <>
      <Navigator />
      {/* <NewPj /> */}
      <div className="app home-app" onClick={navOff}>
        <nav className="home-nav">
          {userInfo && (
            <Balance balance={userInfo.balance} />
          )}
          <div className="ancors white-box">
            <Link to="/gacha">
            <Button1 className="shiny">
              GACHA
              <BsMoonStarsFill />
            </Button1>
            </Link>
            <Link to="/casino">
              <Button1 className="shiny">
                CASINO
                <GiDiceFire />
              </Button1>
            </Link>
          </div>
        </nav>
        <div className="buttons-div">
        <Button3 click={goToCollection}>
          <MdCollectionsBookmark />
          <p>COLLECTION</p>
        </Button3>
        <Button3 click={goToStats}>
          <MdOutlineQueryStats />
          <p>STATS</p>
        </Button3>
        <Button3 click={goToAchievements}>
          <GiAchievement />
          <p>ACHIEVEMENTS</p>
        </Button3>
        </div>
        <LoadingFullscreen />
      </div>
    </>
  );
}
