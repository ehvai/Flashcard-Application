import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

export default function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const response=await listDecks(abortController.signal)
        setDecks(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadDecks();
    return () => {
      abortController.abort();
    };
  }, []);

  function handleClick(path) {
    history.push(path);
  }

  async function handleDelete(event) {
    event.preventDefault();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      window.location.reload(true);
    }
    await deleteDeck(event.target.value);
  }

  const showDeck = decks.map((deck) => {
    return (
      <div className="card" key={deck.id}>
        <div className="card-body">
          <div className="row justify-content-between">
            <h5 className="card-title">{deck.name}</h5>
            <h2 style={{ fontSize: "15px" }}>{`${deck.cards.length} cards`}</h2>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="row justify-content-between">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => handleClick(`/decks/${deck.id}`)}
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
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              value={deck.id}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-secondary btn-lg bit"
        onClick={() => handleClick("/decks/new")}
      >
        Create Deck
      </button>
      {showDeck}
    </React.Fragment>
  );
}
