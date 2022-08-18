import { replaceUserInfo, updateUserInfo } from "../../firebase/client";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomElements(array, quantity) {
  return shuffleArray([...array]).slice(0, quantity);
}

export const starsMultipler = (stars) => {
  const multipler = 1 + (stars * 0.05);
  return multipler;
};

const addRewards = (information, packReward, setPackContains) => {
  let harem = information.pjs;
  let addi = [];
  packReward = packReward.map((r) => {
    if (
      harem.filter((e) => e.id === r.id).length > 0 ||
      addi.filter((e) => e.id === r.id).length > 0
    ) {
      const repeated = harem.filter((e) => e.id === r.id)[0];
      harem = harem.filter((e) => e.id !== r.id);
      if (r.legendary) {
        addi = [
          ...addi,
          {
            id: repeated.id,
            stars: repeated.stars + 5,
            legendary: repeated.legendary,
          },
        ];
        return {
          ...r,
          repeated: true,
          stars: repeated.stars + 5,
          value: Math.floor(r.value * starsMultipler(repeated.stars + 5)),
        };
      } else {
        addi = [
          ...addi,
          {
            id: repeated.id,
            stars: repeated.stars + 1,
            legendary: repeated.legendary,
          },
        ];
        return {
          ...r,
          repeated: true,
          stars: repeated.stars + 1,
          value: Math.floor(r.value * starsMultipler(repeated.stars + 1)),
        };
      }
    } else {
        if (r.legendary) {
            addi = [...addi, { id: r.id, stars: 0, legendary: r.legendary }];
            return { ...r, repeated: false, stars: null, value: Math.floor(r.value*5)};
        } else {
            addi = [...addi, { id: r.id, stars: 0, legendary: r.legendary }];
            return { ...r, repeated: false, stars: null, };
        }
    }
  });
  setPackContains(packReward);
  const newPjs = harem.concat(addi);
  console.log(information);
  console.log(newPjs);
  replaceUserInfo(information.uid, { ...information, pjs: newPjs });
};

export const openThisPack = ({
  quantity,
  bundle,
  setPackContains,
  information,
  legendaryChance,
}) => {
  let packReward = randomElements(bundle, quantity);
  const legendaryCard = (chance) => {
    const random = Math.random();
    if (random > 1 - chance) {
      return true;
    } else {
      return false;
    }
  };
  packReward = packReward.map((r) => {
    return { ...r, legendary: legendaryCard(legendaryChance) };
  });
  addRewards(information, packReward, setPackContains);
  document.querySelector(".gacha-page-1").classList.add("to-left");
};
