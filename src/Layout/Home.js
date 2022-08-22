import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export default function Home({decks}) {
   const history = useHistory();

  function handleClick(path) {
    history.push({
        pathname: path,
        deckId: decks.id
    });
  }

  async function handleDelete(event) {
    event.preventDefault();
    let deckId = '';
    if(window.confirm("Delete this deck?  You will not be able to recover it.")){window.open(deckId = event.target.value)}
    await deleteDeck(deckId)
    history.push("/")
}

  const showDeck = decks.map((deck) => {
    return (
      <div className="card" key={deck.id}>
        <div className="card-body">
          <div className="row justify-content-between">
            <h5 className="card-title">{deck.name}</h5>
            <h2 style={{ fontSize: "15px" }}>{deck.cards.length} Cards</h2>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="row justify-content-between">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => handleClick(`/deck/${deck.id}`)}
              >
                View
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleClick(`/decks/${deck.id}/study`)}
              >
                Study
              </button>
            </div>
            <button className="btn btn-danger" onClick={(handleDelete)} value={deck.id}>Delete</button>
          </div>
        </div>
      </div>
    );
  });

  console.log(showDeck);

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary btn-lg bit"
        onClick={() => handleClick("/deck/new")}
      >
        + Create Deck
      </button>
      {showDeck}
    </>
  );
}
