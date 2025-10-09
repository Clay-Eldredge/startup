import React from 'react';
import 'feed.css';

export function Feed() {
    const posts = [
        {
            id: 1,
            username: "Clay",
            content: "I hate playing against bayonetta",
            timestamp: "2025-10-06 09:30 AM",
            
        }
    ];

    return (
      <main>
            <div class="character-div">
                <img src="/Mario.png"></img>
                <p>THIS IS WHERE THE TOURNAMENT DATA WILL BE DISPLAYED FOR THIS CHARACTER USING AN API</p>
            </div>
            <div class="feed-div">
                <ul class="feed-ul">
                    <li class="post">
                        <p>Post contents</p>
                        <button class="btn btn-primary">LIKE</button>
                        <span>0 Likes</span>
                    </li>
                    <li class="post">
                        <p>Post contents</p>
                        <button class="btn btn-primary">LIKE</button>
                        <span>0 Likes</span>
                    </li>
                </ul>
            </div>
            <div class="post-div">
                <p>Post a note with tips for the Mario matchup! Type '[' to add one or more tags. (Example: '[Pikachu][Bair]')</p>
                <input type="text" value="Create a post..."></input>
            </div>
        </main>
    );
}