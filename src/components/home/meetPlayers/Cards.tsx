import { Animate } from "react-move";
import { easePolyOut } from "d3-ease";

import Otamendi from "../../../../public/images/players/Otamendi.png";
import Sterling from "../../../../public/images/players/Raheem_Sterling.png";
import Kompany from "../../../../public/images/players/Vincent_Kompany.png";

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
function HomeCard(props) {
  function showAnimateCards() {
    return card.map((card, i) => <Animate></Animate>);
  }

  return <div>{showAnimateCards()}</div>;
}

export { HomeCard };
