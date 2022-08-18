import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { GiDiceFire } from "react-icons/gi";
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

export default function Home() {
  const [user, setUser] = useState(undefined);
  const [allPjs, setAllPjs] = useState(undefined);
  const [randomPj, setRandomPj] = useState({ name: "", serie: ".", img: "" });
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user) {
      getAllPjs().then((result) => setAllPjs(result));
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

  useEffect(() => {
    if (allPjs) {
      const num = Math.round(Math.random() * allPjs.length) - 1;
      const random = allPjs[num];
      setRandomPj(random);
    }
  }, [allPjs]);

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

  return (
    <>
      <Navigator />
      {/* <NewPj /> */}
      <div className="app">
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
        <LoadingFullscreen />
      </div>
    </>
  );
}
