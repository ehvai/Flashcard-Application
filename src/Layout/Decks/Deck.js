import { Switch, Route } from "react-router-dom";

export default function Deck(decks) {
  const showDeck = decks.map((deck) => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          <button className="btn btn-secondary">View</button>
          <button className="btn btn-primary">Study</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  });

  console.log(showDeck);

  return <>{showDeck}</>;
}
