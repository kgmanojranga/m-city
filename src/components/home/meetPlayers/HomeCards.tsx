import { Animate } from "react-move";
import { easePolyOut } from "d3-ease";

import Otamendi from "../../../../public/images/players/Otamendi.png";
import Sterling from "../../../../public/images/players/Raheem_Sterling.png";
import Kompany from "../../../../public/images/players/Vincent_Kompany.png";
import { PlayerCard } from "../../utils/PlayerCard";

const card = [
  {
    bottom: 90,
    left: 300,
    player: Kompany
  },
  {
    bottom: 60,
    left: 200,
    player: Sterling
  },
  {
    bottom: 30,
    left: 100,
    player: Otamendi
  },
  {
    bottom: 0,
    left: 0,
    player: Otamendi
  }
];
function HomeCard({ show }: { show: boolean }) {
  function showAnimateCards() {
    return card.map((card, i) => (
      <Animate
        key={i}
        show={show}
        start={{ left: 0, bottom: 0 }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 500, delay: 300, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => (
          <div style={{ position: "absolute", left, bottom }}>
            <PlayerCard
              number="30"
              name="Nicolas"
              lastName="Otamendi"
              bck={Otamendi}
            />
          </div>
        )}
      </Animate>
    ));
  }

  return <div>{showAnimateCards()}</div>;
}

export { HomeCard };
