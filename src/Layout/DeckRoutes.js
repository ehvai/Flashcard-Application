import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import Study from "./Study"
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";

export default function DeckRoutes({decks}) {
  const { path } = useRouteMatch();
  const { deckId } = useParams();

  return (
    <>
      <Switch>
        <Route path={path}>
            <Deck />
        </Route>
        <Route path={`${path}/study`}>
            <Study deckId={deckId}/>
        </Route>
        <Route path={`${path}/edit`}>
            <EditDeck decks={decks}/>
        </Route>
        <Route path={`${path}/cards/new`}>
            <AddCard />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
            <EditCard />
        </Route>
      </Switch>
    </>
  );
}
