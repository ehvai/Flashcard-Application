import Breadcrumb from "../Breadcrumb";
import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard, updateCard } from "../../utils/api";

export default function EditCard() {
  const [deck, setDeck] = useState([]);
  const { deckId, cardId } = useParams();
  const { url } = useRouteMatch();
  const history=useHistory();
  const initialEditCard = {
    front: "",
    back: "",
  };

  const [editCard, setEditCard] = useState({ ...initialEditCard });

  useEffect(() => {
    const abortController = new AbortController();
    async function viewDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
        setEditCard(await readCard(cardId));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && viewDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  async function updateExistingCard() {
    const abortController = new AbortController();
    return await updateCard(editCard, abortController.signal);
  }

  function handleChange(event) {
    setEditCard({ ...editCard, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateExistingCard();
    history.push(`/decks/${deck.id}`)
    setEditCard({ ...initialEditCard });
  }


  return (
    <>
      <Breadcrumb
        pathName={`/decks/${deck.id}`}
        deckName={deck.name}
        pageName={`Edit Card ${editCard.id}`}
      />
      <h1>Edit Card</h1>
      <CardForm
        formName="Edit Card"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        card={editCard}
        deckId={deck.id}
      />
    </>
  );
}
