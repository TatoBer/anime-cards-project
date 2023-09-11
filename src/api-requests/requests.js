import axios from "axios";

export const getUserInfo2 = async (uid) => {
  const response = await axios
    .get(`https://anime-cards-a-p-i.vercel.app/api/users/${uid}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log("ERROR", err));

  return response;
};

export const createUserInfo2 = async (uid) => {
  const response = await axios
    .post("https://anime-cards-a-p-i.vercel.app/api/users/", {
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
    .put("https://anime-cards-a-p-i.vercel.app/api/users/", { ...info, uid })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  return response;
};

export const getAllPjs2 = async () => {
  const response = await axios
    .get("https://anime-cards-a-p-i.vercel.app/api/character/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log("ERROR", err));

  return response;
};

export const createPj2 = async (pj) => {
  const response = await axios
    .post("https://anime-cards-a-p-i.vercel.app/api/characters/", pj)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log("ERROR", err));
  return response;
};

export const updatePj2 = async (pj) => {
  const response = await axios
    .put("https://anime-cards-a-p-i.vercel.app/api/character/", pj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  return response;
};
