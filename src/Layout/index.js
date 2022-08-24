import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Deck from "./Decks/Deck";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import Study from "./Study";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import { listDecks } from "../utils/api";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

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
            <Home decks={decks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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
