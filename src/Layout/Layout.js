import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "./Decks/Deck"
import { listDecks } from "../utils/api/index";
import {Switch, Route} from "react-router-dom";

function Layout() {
 const [decks, setDeck] = useState([])

 useEffect(()=> {
  setDeck(listDecks())
},[])

  return (
    <>
      <Header />
      <div className="container">
        <button type="button" className="btn btn-secondary btn-lg bit">+ Create Deck</button>
        <Switch>
          <Route path="/decks/:deckId">
            <Deck decks={decks}/>
          </Route>
          <Route>
            <NotFound />  
          </Route>
        </Switch>

      </div>
    </>
  );
}

export default Layout;
