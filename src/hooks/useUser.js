import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserInfo2, getUserInfo2 } from "../api-requests/requests";
import { onAuthStateChanged } from "../firebase/client";

const useUser = (autoChargeDelete = true) => {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const navigate = useNavigate();

  const fetchUserInfo = () => {
    getUserInfo2(user.uid).then((res) => {
      setUserInfo(res);
    });
  };

  const handleBet = (bet, goBet, enableBets, type)=> {
    getUserInfo2(user.uid).then((res) => {
        setUserInfo(res);
        if (res.balance >= bet) {
          goBet(bet, type, res);
        } else {
          setTimeout(() => {
            enableBets();
          }, 500);
          console.log("NO TE ALCANZA!");
        }
      });
  }


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
            fetchUserInfo()
          });
        } else {
          setUserInfo(res);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (userInfo && autoChargeDelete) {
      setTimeout(() => {
        document.querySelector(".loading-fullscreen").classList.add("off");
      }, 200);
    }
  }, [userInfo]);

  return { user, userInfo, fetchUserInfo, handleBet, setUserInfo };
};

export default useUser;
