import { starsMultipler } from "../gacha/functions";

export const displayPjs = ({ allPjs, userPjs, order }) => {
  const pjs = userPjs.map((userPj) => {
    const pjInfo = allPjs.filter((e) => e.id === userPj.id)[0];
    if (userPj.legendary) {
      return {
        ...pjInfo,
        value: Math.floor(pjInfo.value * 2 * starsMultipler(userPj.stars)),
        stars: userPj.stars,
        legendary: userPj.legendary,
        date: Number(userPj.date),
      };
    } else {
      return {
        ...pjInfo,
        value: Math.floor(pjInfo.value * starsMultipler(userPj.stars)),
        stars: userPj.stars,
        legendary: userPj.legendary,
        date: Number(userPj.date),
      };
    }
  });

  const sortedArray = sortArray(pjs, order);
  const arrayPages = dividedArray(sortedArray);
  return arrayPages;
};

const sortArray = (pjs, order) => {
  let pjsOrder = pjs;
  if (order === "VALUE DESC.") {
    pjsOrder.sort((a, b) => {
      return b.value - a.value;
    });
  } else if (order === "VALUE ASC.") {
    pjsOrder.sort((a, b) => {
      return a.value - b.value;
    });
  } else if (order === "STARS DESC.") {
    pjsOrder.sort((a, b) => {
      return b.stars - a.stars;
    });
  } else if (order === "STARS ASC.") {
    pjsOrder.sort((a, b) => {
      return a.stars - b.stars;
    });
  } else if (order === "RARITY") {
    pjsOrder.sort((a, b) => {
      return b.legendary - a.legendary;
    });
  } else if (order === "DATE DESC.") {
    pjsOrder.sort((a, b) => {
      return b.date - a.date;
    });
  } else if (order === "DATE ASC.") {
    pjsOrder.sort((a, b) => {
      return a.date - b.date;
    });
  } else {
    pjsOrder.sort((a, b) => {
      return b.value - a.value;
    });
  }

  return pjsOrder;
};

const dividedArray = (pjsInOrder) => {
  const chunkSize = 10;
  let arrayDeArrays = [];
  for (let i = 0; i < pjsInOrder.length; i += chunkSize) {
    const chunk = pjsInOrder.slice(i, i + chunkSize);
    arrayDeArrays = [...arrayDeArrays, chunk];
  }
  return arrayDeArrays;
};
