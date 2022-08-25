import axios from "axios";

export const getUserInfo2 = async (uid) => {
  const response = await axios
    .get(`https://anime-cards-app.herokuapp.com/api/users/${uid}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log("ERROR", err));

  return response;
};

export const createUserInfo2 = async (uid) => {
  const response = await axios
    .post("https://anime-cards-app.herokuapp.com/api/users/", {
      uid: uid,
      configs: {},
      pjs: [],
      balance: 10000,
      achievements: {
        casinoWins: 0,
        freeChest: { lastPick: 1660132049, count: 0 },
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return response;
};

export const updateUserInfo2 = async (uid, info) => {
  const response = await axios
    .put("https://anime-cards-app.herokuapp.com/api/users/", { ...info, uid })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  return response;
};
