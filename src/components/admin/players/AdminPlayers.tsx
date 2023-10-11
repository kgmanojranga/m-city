import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "../../../hoc";
import { getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { playersCollection } from "../../config/firebase-config";
import { Button } from "@mui/material";
import { PlayerType } from "../../../temp/m-city-export";

function AdminPlayers() {
  const [lastVisible, setLastVisible] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<PlayerType[] | null>(null);

  console.log(loading);

  const dataLoading = useCallback(
    async function () {
      try {
        const currentLoadedPlayers: PlayerType[] = [];
        const playersQuery = query(
          playersCollection,
          orderBy("name"),
          limit(2),
          startAfter(lastVisible)
        );
        const playersSnapShot = await getDocs(playersQuery);
        playersSnapShot.forEach((doc) => {
          currentLoadedPlayers.push({
            id: doc.id,
            ...doc.data()
          } as PlayerType);
        });

        setPlayers((prePlayers) => {
          if (prePlayers) {
            return [...prePlayers, ...currentLoadedPlayers];
          }
          return currentLoadedPlayers;
        });
        setLastVisible(currentLoadedPlayers.at(-1)?.name || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [lastVisible]
  );

  useEffect(() => {
    if (!players) {
      setLoading(true);
      dataLoading();
    }
  }, [players, dataLoading]);

  function loadMorePlayers() {
    if (lastVisible) {
      setLoading(true);
      dataLoading();
    } else {
      console.log("nothing to load");
    }
  }

  return (
    <AdminLayout title="The Players">
      <Button onClick={() => loadMorePlayers()}>load more</Button>
    </AdminLayout>
  );
}

export { AdminPlayers };
