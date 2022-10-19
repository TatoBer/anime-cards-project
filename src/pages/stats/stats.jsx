import React from "react";
import Navigator from "../../components/navigator/navigator";
import "./stats.css";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import Stat from "../../components/stat/stat";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { BsStarFill, BsStars } from "react-icons/bs";
import { navOff } from "../../components/navigator/functions";
import useUser from "../../hooks/useUser";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Stats() {
  const {userInfo} = useUser()

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
      <div className="app stats-app" onClick={navOff}>
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
