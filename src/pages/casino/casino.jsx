import React from "react";
import "../../components/home-nav/home-nav.css";
import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
} from "../../firebase/client";
import { useNavigate, Link } from "react-router-dom";
import Navigator from "../../components/navigator/navigator";
import "./casino.css";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import Balance from "../../components/balance/balance";
import Coin from "../../components/coin/coin";
import { GiBurningSkull, GiBleedingHeart } from "react-icons/gi";
import YourBet from "../../components/your-bet/your-bet";
import BetNotification from "../../components/bet-notification/bet-notification";
import { createUserInfo2, getUserInfo2, updateUserInfo2 } from "../../api-requests/requests";
import { navOff } from "../../components/navigator/functions";

export default function Casino() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [flipBet, setFlipBet] = useState(0);
  const [bet, setBet] = useState(0);
  const [win, setWin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user) {
      getUserInfo2(user.uid).then((res) => {
        if (!res) {
          createUserInfo2(user.uid).then(()=>{
            getUserInfo2(user.uid).then(res=>{
              setUserInfo(res);
             })
          });      
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

  const betUpdating = () => {
    setFlipBet(
      Math.floor(Number(document.querySelector("input[name=bet]").value))
    );
  };

  const maxBet = () => {
    document.querySelector("input[name=bet]").value = userInfo.balance;
    setFlipBet(userInfo.balance);
  };

  const disableBets = () => {
    document.querySelectorAll(".coin").forEach((elemento) => {
      elemento.classList.add("disabled");
    });
  };

  const enableBets = () => {
    document.querySelectorAll(".coin").forEach((elemento) => {
      elemento.classList.remove("disabled");
    });
  };

  const getRandomCoin = () => {
    const randomResult = Math.random();
    if (randomResult < 0.5) {
      document.querySelector(".sun-result").classList.add("enter");
      setTimeout(() => {
        document.querySelector(".sun-result").classList.remove("enter");
      }, 500);
      return "sun";
    } else {
      document.querySelector(".moon-result").classList.add("enter");
      setTimeout(() => {
        document.querySelector(".moon-result").classList.remove("enter");
      }, 500);
      return "moon";
    }
  };

  const handleCoinWin = async (bet, info) => {
      const newBalance = info.balance + bet;
      const totalWinned = info.achievements.casinoWins + bet
      await updateUserInfo2(user.uid, { balance: newBalance, achievements: {...info.achievements, casinoWins: totalWinned} });
      await getUserInfo2(user.uid).then((res) => {
        setUserInfo(res);
      });
      const betNotification = document.querySelector(".bet-notification");
      setBet(bet);
      setWin(true);
      betNotification.classList.remove("red");
      betNotification.classList.add("enter");
      setTimeout(() => {
        betNotification.classList.remove("enter");
      }, 700);
      setTimeout(() => {
        enableBets();
      }, 500);
  };

  const handleCoinLose = async (bet, info) => {
      const newBalance = info.balance - bet;
      await updateUserInfo2(user.uid, { balance: newBalance });
      await getUserInfo2(user.uid).then((res) => {
        setUserInfo(res);
      });
      const betNotification = document.querySelector(".bet-notification");
      setBet(bet);
      setWin(false);
      betNotification.classList.add("red");
      betNotification.classList.add("enter");
      setTimeout(() => {
        betNotification.classList.remove("enter");
      }, 700);
      setTimeout(() => {
        enableBets();
      }, 500);
  };

  const goBet = async (bet, win, info) => {
    const winner = getRandomCoin();
    if (winner === win) {
      handleCoinWin(bet, info);
    } else {
      handleCoinLose(bet, info);
    }
  };

  const betMoon = async () => {
    disableBets();
    const bet = flipBet;
    await getUserInfo2(user.uid).then((res) => {
      setUserInfo(res);
      if (res.balance >= bet) {
        goBet(bet, "moon", res);
      } else {
        setTimeout(() => {
          enableBets();
        }, 500);
        console.log("NO TE ALCANZA!");
      }
    });
  };

  const betSun = async () => {
    disableBets();
    const bet = flipBet;
    await getUserInfo2(user.uid).then((res) => {
      setUserInfo(res);
      if (res.balance >= bet) {
        goBet(bet, "sun", res);
      } else {
        setTimeout(() => {
          enableBets();
        }, 500);
        console.log("NO TE ALCANZA!");
      }
    });
  };

  return (
    <>
      <Navigator />
      <LoadingFullscreen />
      <div className="app casino-app" onClick={navOff}>
        {userInfo && <Balance balance={userInfo.balance} />}
        <BetNotification bet={bet} win={win} />
        <div className="coinflip">
          <YourBet onChange={betUpdating} max={maxBet} />
          <section>
            <div className="coins">
              <Coin className="sun" onClick={betSun}>
                <GiBleedingHeart />
              </Coin>
              <Coin className="moon" onClick={betMoon}>
                <GiBurningSkull />
              </Coin>
            </div>
            <div className="result">
              <GiBleedingHeart className="sun-result" />
              <GiBurningSkull className="moon-result" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
