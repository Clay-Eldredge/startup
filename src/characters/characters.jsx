import React from "react";
import { Link } from "react-router-dom";
import "./characters.css";
import { characters } from "./characterList";

export function Characters() {
  return (
    <main className="characters-page">
      <div className="character-grid">
        <ul className="character-list">
          {Object.entries(characters).map(([key, data]) => (
            <li key={key} className="character-list-item">
              <Link className="character-list-button" to={`/feed/${key}`}>
                <img
                  src={`/Characters/Cards/${data.icon_path}`}
                  alt={data.display_name}
                  className="character-img"
                />
                <p>{data.display_name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
