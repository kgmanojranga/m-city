import { Tag } from "../../utils/tools";
import { Blocks } from "./Blocks";

function MatchesHome() {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bck="#0e1731" size="50px" add={{ color: "#fff" }}>
          Matches
        </Tag>

        <Blocks />

        <Tag size="22px" link="/the-team" add={{ color: "#0e1731" }}>
          Matches
        </Tag>
      </div>
    </div>
  );
}

export { MatchesHome };
