import React, { useEffect, useState } from "react";
import { createUserInfo2, getUserInfo2 } from "../../api-requests/requests";
import Navigator from "../../components/navigator/navigator";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "../../firebase/client";
import LoadingFullscreen from "../../components/loadingFullscreen/loadingFullscreen";
import "./achievements.css";
import { navOff } from "../../components/navigator/functions";

export default function Achievements() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);

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
          createUserInfo2(user.uid).then(() => {
            getUserInfo2(user.uid).then((res) => {
              setUserInfo(res);
            });
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


  return (
    <>
      <Navigator />
      <LoadingFullscreen />
      <div className="app achievements-app" onClick={navOff}>
        {/* {userInfo && (
          <>
            <Balance balance={userInfo.balance} />
            <div className="achievements-div">
              <Logro
                svg={<GiClubs />}
                completed={false}
                status={userInfo.pjs.length}
                goal={100}
                claimed={true}
              >
                Collect 100 cards
              </Logro>
              <Logro />
              <Logro />
              <Logro />
            </div>
          </>
        )} */}
        <h2>COMING SOON!</h2>
      </div>
    </>
  );
}
