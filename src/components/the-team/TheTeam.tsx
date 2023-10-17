import { useState, useEffect } from "react";

import { PlayerCard } from "../utils/PlayerCard";
import { Slide } from "react-awesome-reveal";

import { showErrorToast } from "../utils/tools";

import { playersCollection, storage } from "../../config/firebase-config";
import { getDocs } from "firebase/firestore";
import { PlayerType } from "../../temp/m-city-export";
import { getDownloadURL, ref } from "firebase/storage";

function TheTeam() {
  const [loading, setLoading] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  console.log(players);

  async function getPlayers() {
    setLoading(true);
    try {
      const currentPlayers: PlayerType[] = [];
      const playersSnapShot = await getDocs(playersCollection);
      playersSnapShot.forEach((doc) =>
        currentPlayers.push({
          ...doc.data(),
          id: doc.id,
          imageURL: ""
        } as PlayerType)
      );

      const promises: Promise<string>[] = [];

      currentPlayers.forEach((player, index) => {
        const playerImgRef = ref(storage, `players/${player.image}`);

        // const url: Promise<string> = getDownloadURL(playerImgRef);
        promises.push(
          new Promise((resolve, reject) => {
            getDownloadURL(playerImgRef)
              .then((url) => {
                currentPlayers[index].imageURL = url;
                resolve("Hi");
              })
              .catch((error) => {
                reject();
                console.log(error);
              });
          })
        );
      });

      Promise.all(promises).then(() => setPlayers(currentPlayers));
    } catch (err) {
      showErrorToast("Sorry😥. Try again later");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (players.length < 1) getPlayers();
  }, [players]);

  return <div>Hi The Team</div>;
}

export { TheTeam };
