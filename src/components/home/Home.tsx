import { MatchesHome } from "./matches";
import { Featured } from "./featured";
import { MeetPlayers } from "./meetPlayers";
function Home() {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
    </div>
  );
}

export { Home };
