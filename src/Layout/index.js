import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Decks/CreateDeck";
import DeckRoutes from "./DeckRoutes";
import { listDecks } from "../utils/api";
import React, { useState, useEffect } from "react";
import {Switch, Route } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        setDecks(await listDecks(abortController.signal));
      } catch (error) {
        console.log(error.message);
      }
    }
    loadDecks();
    return () => {
      abortController.abort();
    };
  }, []);

   return (
    <>
      <Header />
      <div className="container">
        <Switch>
         <Route exact path="/">
            <Home decks={decks}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckRoutes decks={decks}/>
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
