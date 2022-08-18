import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import Navigator from "../../components/navigator/navigator";
import Sobre from "../../components/sobre/sobre";
import {
  createUserInfo,
  getAllPjs,
  getUserInfo,
  onAuthStateChanged,
  updateUserInfo,
} from "../../firebase/client";
import "./gacha.css";
import {
  GiFrozenArrow,
  GiBeastEye,
  GiCrossedChains,
  GiBurningForest,
  GiBurningMeteor,
  GiCompanionCube,
  GiEagleEmblem,
  GiFlamingSheet,
  GiFog,
} from "react-icons/gi";
import { RiRecycleFill } from "react-icons/ri";
import { MdSkipNext } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import Balance from "../../components/balance/balance";
import { openThisPack } from "./functions";

export default function Gacha() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [allPjs, setAllPjs] = useState([]);
  const [packWin, setPackWin] = useState(null);
  const [buton, setButon] = useState(true);
  const [packContains, setPackContains] = useState([
    {
      name: "Shoto Todoroki",
      value: 14583,
      serie: "Boku no Hero Academia",
      img: "https://firebasestorage.googleapis.com/v0/b/anime-cards-50ace.appspot.com/o/shoto-todoroki.webp?alt=media&token=73922f2f-dfa4-451b-b4c4-9c2937a3dc77",
    },
  ]);

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
      getAllPjs().then((res) => setAllPjs(res));
    }
  }, [userInfo]);

  const seeAllPjs = () => {
    console.log(allPjs);
  };

  const packLeave = () => {
    document.querySelector(".gacha-page-1").classList.remove("to-left");
    setTimeout(() => {
      setPackContains([]);
      setPackWin(null);
    }, 300);
  };


  const nextWin = () => {
    if (packContains.length > 0) {
      const h4 = document.querySelector(".gacha-page-2 > section > h4");
      const bundle = packContains;
      const card = document.querySelector(".cardwin");
      const roll = document.querySelector(
        "section > span > .control:nth-child(1) > svg"
      );
      if (!packWin) {
        h4.classList.add("off");
        roll.classList.add("disabled");
        setTimeout(() => {
          setPackWin(bundle.shift());
          setPackContains(bundle);
          setTimeout(() => {
            document.querySelector(".cardwin").classList.remove("off");
          }, 1);
        }, 200);
        setTimeout(() => {
          if (bundle.length > 0) {
            roll.classList.remove("disabled");
          }
        }, 500);
      } else {
        card.classList.add("off");
        roll.classList.add("disabled");
        setTimeout(() => {
          setPackWin(bundle.shift());
          setPackContains(bundle);
          setTimeout(() => {
            document.querySelector(".cardwin").classList.remove("off");
          }, 1);
        }, 200);
        setTimeout(() => {
          if (bundle.length > 0) {
            roll.classList.remove("disabled");
          }
        }, 500);
      }
    }
  };

  const goPack = (information, price, quantity, legendaryChance) => {
    const newBalance = information.balance - price;
    updateUserInfo(user.uid, { balance: newBalance });
    setUserInfo({ ...information, balance: newBalance });
    const call = {
      quantity: quantity,
      bundle: allPjs,
      setPackContains,
      information,
      legendaryChance,
    };
    openThisPack(call);
  };

  const handlePackSelection = (price, quantity, legendaryChance)=>{
    getUserInfo(user.uid).then((x) => {
      const information = x[0];
      setUserInfo(information);
      if (information.balance >= price) {
        goPack(information, price, quantity, legendaryChance)
      }
    });
  }

  const openPackGold = () => {
    setButon(false);
    handlePackSelection(10000, 5, 0.03)
    setTimeout(() => {
      setButon(true);
    }, 2000);
  };

  const openPackEagle = () => {
    setButon(false);
    handlePackSelection(55000, 25, 0.05)
    setTimeout(() => {
      setButon(true);
    }, 2000);
  };

  return (
    <>
      <Navigator />
      <LoadingFullscreen />
      <div className="app gacha-app">
        <div className="gacha-page-1">
          {userInfo && (
            <>
              <Balance balance={userInfo.balance} />
              <div>
                <Sobre
                  dis={userInfo.balance >= 10000}
                  click={openPackGold}
                  price={10000}
                  buton={buton}
                  bg="linear-gradient(220.55deg, #FFE6A4 0%, #AD8211 100%)"
                >
                  <GiCrossedChains />
                </Sobre>
                <Sobre
                  click={openPackEagle}
                  dis={userInfo.balance >= 55000}
                  price={55000}
                  buton={buton}
                  bg="linear-gradient(220.55deg, #FF9D7E 0%, #4D6AD0 100%)"
                >
                  <GiBeastEye />
                </Sobre>
                <Sobre
                  dis={userInfo.balance >= 100000}
                  price={100000}
                  buton={buton}
                  bg="linear-gradient(220.55deg, #FF5EEF 0%, #456EFF 100%)"
                >
                  <GiBurningForest />
                </Sobre>
              </div>
            </>
          )}
        </div>
        <div className="gacha-page-2">
          <section>
            {packWin ? (
              <>
                <Card
                  name={packWin.name}
                  value={packWin.value}
                  img={packWin.img}
                  serie={packWin.serie}
                  legendary={packWin.legendary}
                  className={`cardwin off`}
                  repeated={packWin.repeated}
                  stars={packWin.stars}
                />
              </>
            ) : (
              <h4>?</h4>
            )}
            {packContains.length > 0 && (
              <Card
                name={packContains[0].name}
                value={packContains[0].value}
                img={packContains[0].img}
                serie={packContains[0].serie}
                className={`cardback off`}
              />
            )}
            <span>
              <div className="control white-box">
                {packContains.length > 0 ? (
                  <>
                    <p>{packContains.length} LEFT</p>
                    <RiRecycleFill onClick={nextWin} />
                  </>
                ) : (
                  <>
                    <p>0 LEFT</p>
                    <RiRecycleFill className="disabled" />
                  </>
                )}
              </div>
              <div className="control white-box">
                {packContains.length > 0 ? (
                  <>
                    <p>SKIP</p>
                    <BiArrowBack onClick={packLeave} />
                  </>
                ) : (
                  <>
                    <p>LEAVE</p>
                    <BiArrowBack onClick={packLeave} />
                  </>
                )}
              </div>
            </span>
          </section>
        </div>
      </div>
    </>
  );
}