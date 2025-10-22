import React from "react";
import { Link } from "react-router-dom";
import "./characters.css";
import { characters } from "./characterList";

export function Characters() {
  return (
    <main className="characters-page">
      <div className="character-grid">
        <ul className="character-list">
          {characters.map((char) => (
            <li key={char} className="character-list-item">
              <Link className="character-list-button" to={`/feed/${char}`}>
                <img src={`/${char}.png`} alt={char} className="character-img" />
                <p>{char}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
