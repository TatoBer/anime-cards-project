import React, { useEffect, useState } from "react";
import Sobre from "../sobre/sobre";
import "./free-pack.css";
import { GiField } from "react-icons/gi";

export default function FreePack({ userInfo, buton, click }) {
  const [time, setTime] = useState(7200);

  const leftTime = () => {
    let actualDate = new Date();
    actualDate = Date.parse(actualDate) / 1000;
    const lastOpen = actualDate - userInfo.achievements.freeChest.lastPick;
    const timeToOpen = 7200;
    const left = timeToOpen - lastOpen;
    return left;
  };

  useEffect(() => {
    setTimeout(() => {
      setTime(leftTime);
    }, 1000);
  }, [time]);

  return (
    <div className="free-pack">
      <Sobre
        buton={buton}
        click={click}
        free={{ time: time }}
        dis={userInfo.balance >= 0}
        bg="linear-gradient(220.55deg, #8beb88 0%, #da35c4 100%)"
      >
        <GiField />
      </Sobre>
    </div>
  );
}
