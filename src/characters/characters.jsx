import React from 'react';
import 'characters.css';

export function Characters() {
    return (
      <main>
            <div class="character-grid">
                <ul class="character-list">
                    <li class="character-list-item">
                        <a class="character-list-button" href="feed.html">
                            <div>
                                This will have a character image and name.
                            </div>
                        </a>
                    </li>
                    <li class="character-list-item">
                        <a class="character-list-button" href="feed.html">
                            <div>
                                Same with this one
                            </div>
                        </a>
                    </li>
                    <li class="character-list-item">
                        <a class="character-list-button" href="feed.html">
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