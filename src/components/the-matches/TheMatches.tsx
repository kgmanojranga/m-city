import { useEffect, useReducer, useState } from "react";
import { CircularProgress } from "@mui/material";
import { matchesCollection } from "../../config/firebase-config";
import { Tables, MatchesList } from ".";
import { MatchesType } from "../../temp/m-city-export";
import { getDocs } from "firebase/firestore";

type StateType = {
  filterMatches: MatchesType[];
  playedFilter: string;
  resultFilter: string;
};

const initialState: StateType = {
  filterMatches: [],
  playedFilter: "All",
  resultFilter: "All"
};

function reducer(
  state: StateType,
  action: { type: string; payload: MatchesType[] }
) {
  switch (action.type) {
    case "played/all":
      return {
        ...state,
        filterMatches: action.payload,
        playedFilter: "All"
      };

    case "played/yes":
      return {
        ...state,
        filterMatches: action.payload.filter((match) => match.final === "Yes"),
        playedFilter: "yes"
      };

    case "played/no":
      return {
        ...state,
        filterMatches: action.payload.filter((match) => match.final === "No"),
        playedFilter: "no"
      };

    case "result/all":
      return {
        ...state,
        filterMatches: action.payload,
        resultFilter: "All"
      };

    case "result/win":
      return {
        ...state,
        filterMatches: action.payload.filter((match) => match.result === "W"),
        resultFilter: "win"
      };

    case "result/loose":
      return {
        ...state,
        filterMatches: action.payload.filter((match) => match.result === "L"),
        resultFilter: "loose"
      };

    case "result/draw":
      return {
        ...state,
        filterMatches: action.payload.filter((match) => match.result === "D"),
        resultFilter: "draw"
      };

    default:
      throw new Error("Type doesn't match with existing ones");
  }
}

function TheMatches() {
  const [matches, setMatches] = useState<MatchesType[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getMatches() {
    try {
      const currentMatches: MatchesType[] = [];
      const matchesSnapShot = await getDocs(matchesCollection);
      matchesSnapShot.forEach((match) => {
        currentMatches.push({ ...match.data(), id: match.id } as MatchesType);
      });
      setMatches(currentMatches);
      dispatch({ type: "played/all", payload: currentMatches });
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
            <div className="left">
              <div className="match_filters">
                <div className="match_filters_box">
                  <div className="tag">Show Match</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.playedFilter === "All" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "played/all", payload: matches })
                      }
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "yes" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "played/yes", payload: matches })
                      }
                    >
                      Played
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "no" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "played/no", payload: matches })
                      }
                    >
                      Not played
                    </div>
                  </div>
                </div>
                <div className="match_filters_box">
                  <div className="tag">Games Results</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.resultFilter === "All" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "result/all", payload: matches })
                      }
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "win" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "result/win", payload: matches })
                      }
                    >
                      W
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "loose" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "result/loose", payload: matches })
                      }
                    >
                      L
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "draw" ? "active" : ""
                      }`}
                      onClick={() =>
                        dispatch({ type: "result/draw", payload: matches })
                      }
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>
              <MatchesList matches={state.filterMatches} />
            </div>
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
