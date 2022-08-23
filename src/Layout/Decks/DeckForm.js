import React, { useState } from "react";

export default function DeckForm({
  formName,
  deckName = "",
  deckDescription = "",
  submitFunction,
}) {

    const [deck, setDeck] = useState({});

  function handleCancel(event) {
    
  }

  function handleChange(event) {
    setDeck({...deck, [event.target.name]: event.target.value})
  }

    submitFunction(deck);

  return (
    <>
      <h1>{formName}</h1>
      <form onSubmit={submitFunction}>
        <div className="form-group">
          <label htmlFor="cardName">Name</label>
          <input
            type="text"
            className="form-control"
            id="cardName"
            aria-describedby="cardname"
            onChange={handleChange}
            value={deckName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={handleChange}
            value={deckDescription}
          />
        </div>
        <button
          type="cancel"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
