import { useEffect, useReducer, useState } from "react";
import { CircularProgress } from "@mui/material";

import { matchesCollection } from "../../config/firebase-config";

import { Tables, MatchesList } from ".";
import { MatchesType } from "../../temp/m-city-export";
import { getDocs } from "firebase/firestore";

function TheMatches() {
  const [matches, setMatches] = useState<MatchesType[]>([]);

  console.log(matches);

  async function getMatches() {
    try {
      const currentMatches: MatchesType[] = [];
      const matchesSnapShot = await getDocs(matchesCollection);
      matchesSnapShot.forEach((match) => {
        currentMatches.push({ ...match.data(), id: match.id } as MatchesType);
      });
      setMatches(currentMatches);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (matches.length === 0) {
      getMatches();
    }
  }, [matches]);

  return (
    <>
      {matches ? (
        <div className="the_matches_container">
          <div className="the_matches_wrapper">
            <div className="left">list</div>
            <div className="right">
              <Tables />
            </div>
          </div>
        </div>
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export { TheMatches };
