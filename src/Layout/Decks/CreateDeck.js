import React, { useState, useEffect } from "react"
import Breadcrumb from "../Breadcrumb";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api";
import { useRouteMatch } from "react-router-dom"


export default function CreateDeck({addNewDeck}){
    const [newDeck, setNewDeck] = useState({});
    const { path } = useRouteMatch();

    function handleSubmit(event) {
        setNewDeck({...newDeck, newDeck});
        addNewDeck(newDeck);
      }

    useEffect(()=>{
        const abortController = new AbortController();
        async function createNewDeck(){
        try {
          setNewDeck(await createDeck(newDeck, abortController.signal))
        } catch (error) {
            console.log(error);
        }
    }
    createNewDeck();
    return (abortController.abort())
},[newDeck]);

    return (
<>
<Breadcrumb pathName={path} deckName="NONE" pageName="Create Deck" />
<DeckForm formName="Create Deck" submitFunction={handleSubmit}/>
</>
    )
}