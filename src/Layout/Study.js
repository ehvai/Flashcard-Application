import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { useParams } from "react-router-dom";
import CardList from "./Cards/CardList";
import Breadcrumb from "./Breadcrumb";

export default function Study() {
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
