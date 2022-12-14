import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { useRouteMatch, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";


// This component handles the Deck and is where all the decks plus their cards are shown.
// It includes the deck, the cards, and the relevant buttons for each component.
function Deck() {
  const { path, url } = useRouteMatch();
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  // On page load, this pulls the deck from the api and sets it as the Deck and Cards
  useEffect(() => {
    const abortController = new AbortController();
    async function viewDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.log(error);
      }
    }
    deckId && viewDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  // Mapping over the card list to get the list of cards to show and giving them the appropriate JSX
  const cardsList = cards.map((card) => {
    return (
      <div className="card mb-3" key={card.id}>
        <div className="row no-cutters justify-content-between">
          <div className="col-6">
            <div className="card-body">
              <p className="card-text">{card.front}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="card-body">
              <p className="card-text">{card.back}</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-end no-gutters">
          <Link
            to={`${url}/cards/${card.id}/edit`}
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleCardDelete} value={card.id}>
            Delete
          </button>
        </div>
      </div>
    );
  });

  // This function deletes the deck when the delete button is pressed for the deck
  async function handleDeckDelete(event) {
    event.preventDefault();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      window.location.reload(true);
    }
    await deleteDeck(event.target.value);
  }

  // This function deletes the card when the delete button is pressed for the card.
  async function handleCardDelete(event) {
    event.preventDefault();
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      window.location.reload(true);
    }
    await deleteCard(event.target.value);
  }

  // The return sends the data to the breadcrumb including null since for this part
  // the breadcrumb only shows the Home/DeckName
  return (
    <React.Fragment>
      <Breadcrumb pathName={path} deckName={null} pageName={deck.name} />
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <div className="row justify-content-between no-gutters">
        <div className="justify-content-between">
          <Link to={`${url}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`${url}/study`} className="btn btn-primary">
            Study
          </Link>
          <Link to={`${url}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
        <div>
          <button type="button" className="btn btn-danger" onClick={handleDeckDelete}>
            Delete
          </button>
        </div>
      </div>
      {cardsList}
    </React.Fragment>
  );
}

export default Deck;