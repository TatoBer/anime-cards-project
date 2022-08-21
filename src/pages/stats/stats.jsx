import React, { useEffect, useState } from "react";
import Navigator from "../../components/navigator/navigator";
import {
  createUserInfo,
  getUserInfo,
  onAuthStateChanged,
} from "../../firebase/client";
import { useNavigate } from "react-router-dom";
import "./stats.css";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import Stat from "../../components/stat/stat";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { BsStarFill, BsStars } from "react-icons/bs";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Stats() {
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
      getUserInfo(user.uid).then((res) => {
        if (res.length === 0) {
          createUserInfo(user.uid);
          getUserInfo(user.uid).then((res) => {
            setUserInfo(res[0]);
          });
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

  const userStars = () => {
    let stars = 0;
    userInfo.pjs.map((pj) => {
      stars = stars + pj.stars;
    });
    return stars;
  };

  const userLegendaries = () => {
    let count = 0;
    userInfo.pjs.map((pj) => {
      const leg = pj.legendary ? 1 : 0;
      count = count + leg;
    });
    return count;
  };

  return (
    <>
      <Navigator />
      <LoadingFullscreen />
      <div className="app stats-app">
        <h1>MY STATS</h1>
        {userInfo && (
          <div className="stat-container">
            <Stat title="CARDS COLLECTED" stat={userInfo.pjs.length}>
              <FaUsers />
            </Stat>
            <Stat title="LEGENDARY COLLECTED" stat={userLegendaries()}>
              <BsStars />
            </Stat>
            <Stat title="STARS EARNED" stat={userStars()}>
              <BsStarFill />
            </Stat>
            <Stat
              title="CASINO EARNS"
              stat={`$${numberWithCommas(userInfo.achievements.casinoWins)}`}
            >
              <FaMoneyBillWave />
            </Stat>
          </div>
        )}
      </div>
    </>
  );
}
