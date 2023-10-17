import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { cityDb } from "./temp/m-city-export";

const firebaseConfig = {
  apiKey: "AIzaSyCqsZapLwVIPrHOJnfUNQ-vQ_omiloIv_Y",
  authDomain: "m-city-9ff4c.firebaseapp.com",
  projectId: "m-city-9ff4c",
  storageBucket: "m-city-9ff4c.appspot.com",
  messagingSenderId: "713955481301",
  appId: "1:713955481301:web:481c4acd51819f79c6b45c",
  measurementId: "G-W55SY7DE95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

const matchesCollection = collection(db, "matches");
const playersCollection = collection(db, "players");
const positionsCollection = collection(db, "positions");
const promotionsCollection = collection(db, "promotions");
const teamsCollection = collection(db, "teams");

// cityDb.teams.forEach(async (item) => {
//   try {
//     await addDoc(teamsCollection, item);
//   } catch (e) {
//     console.error(e);
//   }
// });

//promotions
// cityDb.promotions.forEach(async (item) => {
//   try {
//     await addDoc(promotionsCollection, item);
//   } catch (e) {
//     console.error(e);
//   }
// });

// Positions
// cityDb.positions.forEach(async (item) => {
//   try {
//     await addDoc(positionsCollection, item);
//   } catch (e) {
//     console.error(e);
//   }
// });

//Players
// cityDb.players.forEach(async (item) => {
//   try {
//     await addDoc(playersCollection, item);
//   } catch (e) {
//     console.error(e);
//   }
// });

//Matches
// cityDb.matches.forEach(async (item) => {
//   try {
//     await addDoc(matchesCollection, item);
//   } catch (e) {
//     console.error(e);
//   }
// });

//Manoj's Code
// try {
//   const matchesCollection = collection(db, "matches");
//   const docRef = cityDb.matches.map(
//     async (item) => await addDoc(matchesCollection, item)
//   );

//   console.log(docRef);
// } catch (e) {
//   console.error(e);
// }

export {
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection
};
