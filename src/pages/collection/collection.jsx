import React, { useEffect, useState } from "react";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import Navigator from "../../components/navigator/navigator";
import Balance from "../../components/balance/balance";
import "./collection.css";
import { displayPjs } from "./functions";
import Card from "../../components/card/card";
import PageSwitch from "../../components/page-switch/page-switch";
import OrderSelection from "../../components/order-selection/order-selection";
import {
  getAllPjs2,
} from "../../api-requests/requests";
import { navOff } from "../../components/navigator/functions";
import useUser from "../../hooks/useUser";

export default function Collection() {
  const { userInfo, user } = useUser(false);
  const [allPjs, setAllPjs] = useState([]);
  const [bundleArray, setBundleArray] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    if (user) {
      getAllPjs2().then((allP) => {
        setAllPjs(allP);
        setOrder("VALUE DESC.");
      });
    }
  }, [user]);

  useEffect(() => {
    if (order) {
      setBundleArray(chargeCards(allPjs, userInfo.pjs, order));
    }
  }, [order]);

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        document.querySelector(".loading-fullscreen").classList.add("off");
      }, 200);
    }
  }, [bundleArray]);

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
      <div className="app collection-app" onClick={navOff}>
        {userInfo && <Balance balance={userInfo.balance} />}

        {bundleArray.length > 0 && (
          <PageSwitch
            page={page}
            pageLength={bundleArray.length}
            setPage={setPage}
          />
        )}
        <div className="order-div">
          <div onClick={toggleOrderBy} className="order-by white-box">
            <h3>ORDER BY</h3>
            <button>{order}</button>
          </div>
          <OrderSelection order={order} setOrder={setOrder} />
        </div>
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
