import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { useParams } from "react-router-dom";
import CardList from "./Cards/CardList";
import Breadcrumb from "./Breadcrumb";

// This component has a child component with CardList.  The Study Component handles the deck
// while it sends the inividual card information to the CardList child component
// Originally I was going to use the CardList in the Deck view as well, but the Deck view wanted something very different.

function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  //API pull to get the deck information with cards
  useEffect(() => {
    const abortController = new AbortController();
    async function scanDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && scanDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

// This sets the name to make sure that both the breadcrumb has the correct name and the
// study view has the right information.
// This is in case someone creates a deck with no name.

  const deckName = (deck.name !== undefined) ? (`${deck.name}: `) : null
  const breadName = (deck.name !== undefined) ? deck.name : null

  if (Object.keys(deck).length) {
    return (
      <React.Fragment>
      {/* using the Breadcrumb nav bar*/}
      <Breadcrumb pathName={`/decks/${deck.id}`} deckName={breadName} pageName="Study"/>
        {/* title */}
        <div>
          <h1>{deckName}Study</h1>
        </div>

        {/* card list */}
        <CardList cards={deck.cards} />
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export default Study;