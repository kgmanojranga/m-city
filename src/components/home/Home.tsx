import { MatchesHome } from "./matches";
import { Featured } from "./featured";
import { MeetPlayers } from "./meetPlayers";
import { Promotion } from "./promotion";
function Home() {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promotion />
    </div>
  );
}

export { Home };
