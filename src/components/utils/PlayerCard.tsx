type PlayerCardProps = {
  number: string;
  name: string;
  bck: string;
  lastName: string;
};

function PlayerCard({ number, name, bck, lastName }: PlayerCardProps) {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{ background: `#f2f9ff url(${bck})` }}
      ></div>
      <div className="player_card-nfo">
        <div className="player_card_number">{number}</div>
        <div className="player_card_name">
          <span>{name}</span>
          <span>{lastName}</span>
        </div>
      </div>
    </div>
  );
}

export { PlayerCard };
