export default function DeckForm({ formName, submitButton }) {
  return (
    <>
      <h1>{formName}</h1>
      <form>
        <div class="form-group">
          <label forHtml="cardName">Name</label>
          <input
            type="text"
            class="form-control"
            id="cardName"
            aria-describedby="cardname"
          />
        </div>
        <div class="form-group">
          <label forHtml="description">Description</label>
          <input type="text" class="form-control" id="description" />
        </div>
        <button type="cancel" class="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" onClick={submitButton}>
          Submit
        </button>
      </form>
    </>
  );
}
