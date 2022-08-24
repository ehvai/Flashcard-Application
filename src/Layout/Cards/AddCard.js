import Breadcrumb from "../Breadcrumb";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, createCard } from "../../utils/api";

export default function AddCard() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const initialNewCard = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState({ ...initialNewCard });

  useEffect(() => {
    const abortController = new AbortController();
    async function viewDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && viewDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  async function addNewCard() {
    const abortController = new AbortController();
    return await createCard(deckId, newCard, abortController.signal);
  }

  function handleChange(event) {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewCard();
    setNewCard({ ...initialNewCard });
  }

  return (
    <>
      <Breadcrumb
        pathName={`/decks/${deck.id}`}
        deckName={deck.name}
        pageName="Add Card"
      />
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        formName="Add Card"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        card={newCard}
        deckId={deck.id}
      />
    </>
  );
}
