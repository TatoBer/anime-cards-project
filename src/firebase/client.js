import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  getFirestore,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
// import { doc, , , , , deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQaUMpR0Ud5py-Ns0xtrj2STxlD4iFsL0",
  authDomain: "anime-cards-50ace.firebaseapp.com",
  projectId: "anime-cards-50ace",
  storageBucket: "anime-cards-50ace.appspot.com",
  messagingSenderId: "340821861981",
  appId: "1:340821861981:web:23c17c72388123c61e4fb4",
  measurementId: "G-8XSTEY2DWJ",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);

const mapUserFromFirebaseAuth = (userIn) => {
  if (!userIn) {
    return null;
  } else if (userIn.providerId === "github.com" && userIn.user) {
    const { user } = userIn;
    const { displayName, email, uid } = user;
    return {
      displayName,
      email,
      uid,
    };
  } else if (userIn.providerId === "google.com" && userIn.user) {
    const { user } = userIn;
    const { displayName, email, uid } = user;
    return {
      displayName,
      email,
      uid,
    };
  } else {
    const { _delegate } = userIn;
    const { uid, email, displayName } = _delegate;
    return {
      displayName,
      email,
      uid,
    };
  }
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuth(user);
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = async () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.setCustomParameters(firebaseConfig);
  const auth = getAuth();
  const userIn = await signInWithPopup(auth, githubProvider);
  return mapUserFromFirebaseAuth(userIn);
};

export const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters(firebaseConfig);
  const auth = getAuth();
  const userIn = await signInWithPopup(auth, googleProvider);
  return mapUserFromFirebaseAuth(userIn);
};

export const addNewPj = ({ name, serie, img, value }) => {
  addDoc(collection(db, "pjs-list"), {
    name: name,
    serie: serie,
    img: img,
    value: Number(value),
  });
};

export const getAllPjs = async () => {
  const q = query(collection(db, "pjs-list"), orderBy("value", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

export const logOut = () => {
  firebase.auth().signOut();
};
