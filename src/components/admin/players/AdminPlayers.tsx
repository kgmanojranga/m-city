import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "../../../hoc";
import { getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { playersCollection } from "../../../config/firebase-config";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { PlayerType } from "../../../temp/m-city-export";
import { Link } from "react-router-dom";

function AdminPlayers() {
  const [lastVisible, setLastVisible] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<PlayerType[] | null>(null);

  const dataLoading = useCallback(
    async function () {
      try {
        const currentLoadedPlayers: PlayerType[] = [];
        const playersQuery = query(
          playersCollection,
          orderBy("name"),
          limit(5),
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
      <div className="mb-5">
        <Link to="/admin-players/add-player">
          <Button disableElevation variant="outlined">
            Add player
          </Button>
        </Link>
      </div>
      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ? players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link to={`/admin-players/edit-player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin-players/edit-player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMorePlayers()}
        disabled={loading}
      >
        Load More
      </Button>
      <div className="admin_progress">
        {loading ? <CircularProgress thickness={7} /> : null}
      </div>
    </AdminLayout>
  );
}

export { AdminPlayers };
