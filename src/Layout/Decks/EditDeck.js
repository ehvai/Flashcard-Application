import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import DeckForm from "./DeckForm";
import { updateDeck, readDeck } from "../../utils/api";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";

export default function EditDeck(){
    const initialEditDeck = {
        id: "",
        name: "",
        description: "",
      };
      const [editDeck, setEditDeck] = useState({ ...initialEditDeck });
      const { path } = useRouteMatch();
      const { deckId } = useParams();
      const history = useHistory();

      useEffect(()=> {
        const abortController = new AbortController();
        async function editExistingDeck(){
        try {
          setEditDeck(await readDeck(deckId, abortController.signal))
        } catch (error) {
          console.log(error)
        }
      }
      deckId && editExistingDeck();
      return ()=>{
        abortController.abort()
      }
    },[deckId])
    
      async function addEditDeck() {
        const abortController = new AbortController();
        return await updateDeck(editDeck, abortController.signal);
      }
    
      function handleChange(event) {
        setEditDeck({ ...editDeck, [event.target.name]: event.target.value });
    
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        addEditDeck()
        history.push(`/decks/${editDeck.id}`);
        setEditDeck({ ...initialEditDeck });
      }
    
      return (
        <React.Fragment>
          <Breadcrumb pathName={path} deckName={editDeck.name} pageName="Edit Deck" />
          <DeckForm
            formName="Edit Deck"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            deck={editDeck}
          />
        </React.Fragment>
      );
}