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
  createUserInfo,
  getAllPjs,
  getUserInfo,
  onAuthStateChanged,
  updateUserInfo,
} from "../../firebase/client";
import { useNavigate, Link } from "react-router-dom";
import Navigator from "../../components/navigator/navigator";
import Balance from "../../components/balance/balance";
import Button1 from "../../components/button1/button1";
import Card from "../../components/card/card";
import Button3 from "../../components/button3/button3";

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
      getUserInfo(user.uid).then(res => {
        if (res.length === 0) {
          createUserInfo(user.uid);
          getUserInfo(user.uid).then(res=>{
           setUserInfo(res[0]);
          })
        } else {
          setUserInfo(res[0]);
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

  const lastShop = () => {
    const newInfo = {
      configs: { last: "shop", shop: true },
    };

    updateUserInfo(user.uid, newInfo);
    console.log("SHOP");
  };

  const logUserInfo = () => {
    console.log(userInfo);
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
      <div className="app home-app">
        <nav className="home-nav">
          {userInfo && (
            <Balance balance={userInfo.balance} onClick={logUserInfo} />
          )}
          <div className="ancors white-box">
            <Button1 className="shiny" onClick={lastShop}>
              SHOP
              <FaShoppingCart />
            </Button1>
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
