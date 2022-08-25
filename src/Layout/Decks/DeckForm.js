import React from "react";
import { Link } from "react-router-dom";

// This component is a generic form used by both the Create Deck and Edit Deck components.
// It takes in specific props so that it can be flexible and used for multiple components.

function DeckForm({
  formName,
  handleSubmit,
  handleChange,
  deck,
}) {

// This variable sets the path so that when the link is clicked it goes to the correct location
// based on if there is a deck.id - meaning there is a deck being edited - or not.

const path=(deck.id ? `/decks/${deck.id}` : "/")

// This return uses the props sent from Create and Edit deck components so it can be used for either smoothly

  return (
    <React.Fragment>
      <h1>{formName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            onChange={handleChange}
            value={deck.name}
            placeholder="Deck Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            onChange={handleChange}
            value={deck.description}
            placeholder="Description"
          />
        </div>
        <Link to={path} type="cancel" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default DeckForm;