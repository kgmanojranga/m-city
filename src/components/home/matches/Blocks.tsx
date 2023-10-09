import { useEffect, useState } from "react";
import { MatchesType } from "../../../temp/m-city-export";
import { matchesCollection } from "../../../firebase-config";
import { getDocs } from "firebase/firestore";

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

          console.log(matches);
        } catch (err) {
          console.error(err);
        }
      }

      matchesSnapShotFunc();
    },
    [matches]
  );
  return <div>Blocks</div>;
}

export { Blocks };
