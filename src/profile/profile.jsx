import React from 'react';
import 'profile.css';

export function Profile() {
    return (
      <main>
            <div class="profile-card-div">
                <img src="Mario.png" style="width: 75px; height: 75px;"></img>
                <span>Username</span>
            </div>
            <div class="profile-info-div">
                <p>Mains: Mario, Luigi</p>
                <p>Win Rate: 50%</p>
            </div>
            <div class="profile-feed-div">
                <p>Recent Posts go here</p>
            </div>
        </main>
    );
}