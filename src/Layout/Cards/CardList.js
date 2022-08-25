import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

// This component is a child of Study.  This component displays the card component
// It takes in the list of cards and then returns the individual cards based on the buttons pressed.

function CardList({ cards }) {
  const [side, setSide] = useState(true);
  const [card, setCard] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

// This function flips the card when pressed  
  const flipHandler = () => {
    setSide(!side);
  };

  // This function works when the user is on last card, ask to restart or return to homepage
  const nextHandler = () => {
    if (card === cards.length - 1) {
      window.confirm("Restart Cards?\n\n Click 'Cancel' to return home")
        ? setCard(() => 0)
        : history.push("/");
      // If not last card, go to next card
    } else {
      setCard((card) => card + 1);
      setSide(() => !side);
    }
  };
  // If there are more than two cards in the deck
  if (cards.length > 2) {
    return (
      <div key={deckId} className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {card + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {side ? cards[card].front : cards[card].back}
          </p>
          {/* Flip card button */}
          <button className="btn btn-secondary" onClick={flipHandler}>
            Flip
          </button>
          {/* IF card is on backside, provide a button to go to next card*/}
          {side ? null : (
            <button className="btn btn-primary" onClick={nextHandler}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Not enough cards.</h5>
          <p className="card-text">
            You need atleast 3 cards to study. There are {cards.length} cards in
            this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      </div>
    );
  }
}

export default CardList;
