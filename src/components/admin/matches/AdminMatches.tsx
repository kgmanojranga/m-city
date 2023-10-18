import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "../../../hoc";
import { getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { matchesCollection } from "../../../config/firebase-config";
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
import { MatchesType } from "../../../temp/m-city-export";
import { Link } from "react-router-dom";

function AdminMatches() {
  const [lastVisible, setLastVisible] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<MatchesType[] | null>(null);

  const dataLoading = useCallback(
    async function () {
      try {
        const currentLoadedMatches: MatchesType[] = [];
        const matchesQuery = query(
          matchesCollection,
          orderBy("date"),
          limit(5),
          startAfter(lastVisible)
        );
        const matchesSnapShot = await getDocs(matchesQuery);
        matchesSnapShot.forEach((doc) => {
          currentLoadedMatches.push({
            id: doc.id,
            ...doc.data()
          } as MatchesType);
        });

        setMatches((preMatches) => {
          if (preMatches) {
            return [...preMatches, ...currentLoadedMatches];
          }
          return currentLoadedMatches;
        });
        setLastVisible(currentLoadedMatches.at(-1)?.date || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [lastVisible]
  );

  useEffect(() => {
    if (!matches) {
      setLoading(true);
      dataLoading();
    }
  }, [matches, dataLoading]);

  function loadMoreMatches() {
    if (lastVisible) {
      setLoading(true);
      dataLoading();
    } else {
      console.log("nothing to load");
    }
  }

  return (
    <AdminLayout title="The matches">
      <div className="mb-5">
        <Link to="/admin-matches/add-match">
          <Button disableElevation variant="outlined">
            Add Match
          </Button>
        </Link>
      </div>
      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Match</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches
              ? matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell>
                      <Link to={`/admin-matches/edit-match/${match.id}`}>
                        {match.awayThmb} <strong>-</strong> {match.localThmb}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {match.resultAway} <strong>-</strong> {match.resultLocal}
                    </TableCell>
                    <TableCell>
                      {match.final === "Yes" ? (
                        <span className="matches_tag_red">Final</span>
                      ) : (
                        <span className="matches_tag_green">
                          Not played yet
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMoreMatches()}
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

export { AdminMatches };
