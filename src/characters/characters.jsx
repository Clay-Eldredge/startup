import React from 'react';
import './characters.css';

export function Characters() {
    return (
      <main>
            <div className="character-grid">
                <ul className="character-list">
                    <li className="character-list-item">
                        <a className='character-list-button' to='feed'>
                            <div>
                                This will have a character image and name.
                            </div>
                        </a>
                    </li>
                    <li className="character-list-item">
                        <a className="character-list-button" href="feed.html">
                            <div>
                                Same with this one
                            </div>
                        </a>
                    </li>
                    <li className="character-list-item">
                        <a className="character-list-button" href="feed.html">
                            <div>
                                They will be loaded in by the javascript? There should be almost 90 of these.
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </main>
    );
}