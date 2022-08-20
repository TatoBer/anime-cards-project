import React, { useEffect, useState } from "react";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import Navigator from "../../components/navigator/navigator";
import {
  createUserInfo,
  getAllPjs,
  getUserInfo,
  onAuthStateChanged,
} from "../../firebase/client";
import { useNavigate } from "react-router-dom";
import Balance from "../../components/balance/balance";
import "./collection.css";
import { displayPjs } from "./functions";
import Card from "../../components/card/card";
import PageSwitch from "../../components/page-switch/page-switch";
import OrderSelection from "../../components/order-selection/order-selection";

export default function Collection() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [allPjs, setAllPjs] = useState([]);
  const [bundleArray, setBundleArray] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(undefined);

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
            getAllPjs().then((allP) => {
              setAllPjs(allP)
              setOrder("VALUE DESC.")
            });
          });
        } else {
          setUserInfo(res[0]);
          getAllPjs().then((allP) => {
            setAllPjs(allP)
            setOrder("VALUE DESC.")
          });

        }
      });
    }
  }, [user]);


  useEffect(()=>{
    if (order) {
      setBundleArray(chargeCards(allPjs, userInfo.pjs, order));
    }
  }, [order])

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        document.querySelector(".loading-fullscreen").classList.add("off");
      }, 200);
    }
  }, [userInfo]);

  const chargeCards = (allPjs, userPjs, order) => {
    const call = {
      allPjs,
      userPjs,
      order,
    };
    const arrayToMap = displayPjs(call);
    return arrayToMap;
  };

  const toggleOrderBy = () => {
    document.querySelector(".order-selection").classList.toggle("off");
  };

  return (
    <>
      <Navigator />
      <LoadingFullscreen />
      <div className="app collection-app">
        {userInfo && <Balance balance={userInfo.balance} />}
        <div className="order-div">
          <div onClick={toggleOrderBy} className="order-by white-box">
            <h3>ORDER BY</h3>
            <button>{order}</button>
          </div>
          <OrderSelection order={order} setOrder={setOrder} />
        </div>
        {bundleArray.length > 0 && (
          <PageSwitch
            page={page}
            pageLength={bundleArray.length}
            setPage={setPage}
          />
        )}
        <div className="cards-container">
          {bundleArray.length > 0 ? (
            bundleArray[page - 1].map((carta) => {
              return (
                <Card
                  img={carta.img}
                  name={carta.name}
                  serie={carta.serie}
                  value={carta.value}
                  legendary={carta.legendary}
                  stars={carta.stars}
                  key={carta.id}
                  repeated={true}
                />
              );
            })
          ) : (
            <strong>Your collection is empty!</strong>
          )}
        </div>
      </div>
    </>
  );
}
