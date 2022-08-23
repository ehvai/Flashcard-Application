import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ deckName, pathName, pageName }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {deckName === "NONE" ? null : (
            <li className="breadcrumb-item">
              <Link to={pathName}>{deckName}</Link>
            </li>
          )}
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
