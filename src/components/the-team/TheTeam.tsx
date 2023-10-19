import { useState, useEffect, ReactNode } from "react";

import { showErrorToast } from "../utils/tools";

import { PlayerType } from "../../temp/m-city-export";

import { PlayerCard } from "../utils/PlayerCard";
import { Slide } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";

import { playersCollection, storage } from "../../config/firebase-config";
import { getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

function TheTeam() {
  const [loading, setLoading] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerType[]>([]);

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

  function showPlayerByCategory(category: string): ReactNode {
    return players
      ? players.map((player) => {
          return player.position === category ? (
            <Slide direction="left" key={player.id} triggerOnce={true}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastName={player.lastname}
                  bck={player.imageURL || ""}
                />
              </div>
            </Slide>
          ) : null;
        })
      : null;
  }

  useEffect(() => {
    if (players.length < 1) getPlayers();
  }, [players]);

  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayerByCategory("Keeper")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">{showPlayerByCategory("Defence")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Mid Field</div>
            <div className="team_cards">{showPlayerByCategory("Midfield")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">{showPlayerByCategory("Strikerz")}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export { TheTeam };
