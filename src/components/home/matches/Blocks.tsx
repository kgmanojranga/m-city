import { useEffect, useState } from "react";
import { MatchesType } from "../../../temp/m-city-export";
import { matchesCollection } from "../../config/firebase-config";
import { getDocs } from "firebase/firestore";
import { Slide } from "react-awesome-reveal";
import { MatchesBlock } from "../../utils/Matches-block";

function Blocks() {
  const [matches, setMatches] = useState<MatchesType[]>([]);

  useEffect(
    function () {
      async function matchesSnapShotFunc() {
        try {
          if (!(matches.length > 0)) {
            const matchesSnapShot = await getDocs(matchesCollection);
            matchesSnapShot.forEach((doc) =>
              setMatches((matches) => [
                ...matches,
                { ...(doc.data() as MatchesType), id: `${doc.id}` }
              ])
            );
          }
        } catch (err) {
          console.error(err);
        }
      }

      matchesSnapShotFunc();
    },
    [matches]
  );

  function showMatches() {
    return matches
      ? matches.map((match) => {
          return (
            <Slide triggerOnce={true} key={match.id} className="item">
              <div>
                <div className="wrapper">
                  <MatchesBlock match={match} />
                </div>
              </div>
            </Slide>
          );
        })
      : null;
  }
  return <div className="home_matches">{showMatches()}</div>;
}

export { Blocks };
