import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api";
import { useRouteMatch, useHistory } from "react-router-dom";

export default function CreateDeck() {
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

  function handleChange(event) {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });

  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewDeck().then(({ id }) => history.push(`/decks/${id}`));
    setNewDeck({ ...initialNewDeck });
  }

  return (
    <>
      <Breadcrumb pathName={path} deckName={null} pageName="Create Deck" />
      <DeckForm
        formName="Create Deck"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deck={newDeck}
      />
    </>
  );
}
