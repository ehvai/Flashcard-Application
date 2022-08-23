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
