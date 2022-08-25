import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

// This component sets up the Home page which includes the header and the additional components that follow below.

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  // On load, this pulls in the current deck from the API using the listDecks function
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

  // This function takes care of pushing the clicks to their respective locations based on which button was pushed.
  const handleClick = (path) => {
    history.push(path);
  }

  // This function deletes the card after a warning.  Once it is done, it refreshes the page and shows the decks wtihout the deleted card.
  async function handleDelete(event) {
    event.preventDefault();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      window.location.reload(true);
    }
    await deleteDeck(event.target.value);
  }

  // This creates the deck mapped from the decks, so each individual deck has the elements they all need.
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


  // This shows the decks on the page, along with the create deck button on top.
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

export default Home;