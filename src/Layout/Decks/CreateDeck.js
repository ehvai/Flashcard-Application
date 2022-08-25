import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api";
import { useRouteMatch, useHistory } from "react-router-dom";

// This component creates the deck whenever the button is pressed on the Home
// It includes the DeckForm component and sends the relevant functions forward

function CreateDeck() {
  const initialNewDeck = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState({ ...initialNewDeck });
  const { path } = useRouteMatch();
  const history = useHistory();

  async function addNewDeck() {
    const abortController = new AbortController();
    return await createDeck(newDeck, abortController.signal);
  }

  const handleChange = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewDeck().then(({ id }) => history.push(`/decks/${id}`));
    setNewDeck({ ...initialNewDeck });
  }

  return (
    <React.Fragment>
      <Breadcrumb pathName={path} deckName={null} pageName="Create Deck" />
      <DeckForm
        formName="Create Deck"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deck={newDeck}
      />
    </React.Fragment>
  );
}

export default CreateDeck;