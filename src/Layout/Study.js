import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useHistory, Link, useRouteMatch, useParams } from "react-router-dom";

export default function Study() {
  const [deck, setDeck] = useState();
  const [front, setFront] = useState(true);
  const history = useHistory();
  const { path } = useRouteMatch();
  const { deckId } = useParams();

console.log(deckId)

  useEffect(() => {
    const abortController = new AbortController();
    async function scanDeck(deckId) {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    scanDeck();
    return () => abortController.abort();
  }, []);

  function handleFlip(event) {
    event.preventDefault();
  }

  function handleNext(event) {
    event.preventDefault();
  }

  function handleAddCard(event) {
    event.preventDefault();
  }

  const enoughCards = ((deck.cards.length > 2) ?
    <div>
    <h1>Study: {deck.name}</h1>
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">
          Card {deck.cards.index + 1} of {deck.cards.length}
        </h5>
        <p className="card-text">{deck.cards.description}</p>
        <button className="btn btn-secondary" onClick={handleFlip}>
          Flip
        </button>
        {!front ? (
          <button className="btn btn-secondary" onClick={handleNext}>
            Next
          </button>
        ) : null}
      </div>
    </div>
    </div>
       : 
       <div>
        <h1> {deck.name}: Study</h1>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study.  There are {deck.cards.length} cards in this deck.</p>
        <button className="btn btn-primary" onClick={handleAddCard}>Add Cards</button>
       </div>);

return (
      <>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={path}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" style={{ariaCurrent: "page"}}>
                Study
              </li>
            </ol>
          </nav>
        </div>
        {enoughCards}
       </>
    );

}
