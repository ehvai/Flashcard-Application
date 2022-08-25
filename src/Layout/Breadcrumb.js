import React from "react";
import { Link } from "react-router-dom";

// This is the breadcrumb nav bar file that is snow on all but the home page.
// It is set to take in the name of the deck, the path to be used when clicked on, and the name of the page from each relevant page.
// The logic includes if the name of the deck is set to null just in case someone accidentally creates a page without one, or if the page doesn't have one
// an example being the Create Deck page which has no name yet.

function Breadcrumb({ deckName, pathName, pageName }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          {deckName !== null ? (
            <li className="breadcrumb-item">
              <Link to={pathName}>{deckName}</Link>
            </li>
          ): null}
          <li
            className="breadcrumb-item active"
            style={{ ariaCurrent: "page" }}
          >
            {pageName}
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;