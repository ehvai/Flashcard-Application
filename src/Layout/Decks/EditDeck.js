import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import DeckForm from "./DeckForm";
import { updateDeck, readDeck } from "../../utils/api";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";

// This component does the Edit Deck function and pushes information to the Deck Form component
// This keeps the Edit and Create Deck components looking the same for easier readability and use

function EditDeck(){
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
    
      const handleChange = (event) => {
        setEditDeck({ ...editDeck, [event.target.name]: event.target.value });
    
      }
    
// This function calls the addEditDeck function to make the adjustment to the API
// It then sends the user to the appropriate originating Deck
// It then clears out the useState so that when it is again interacted with it will start fresh

      const handleSubmit = (event) => {
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

export default EditDeck;