import { MatchesHome } from "./matches";
import { Featured } from "./featured";
function Home() {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
    </div>
  );
}

export { Home };
