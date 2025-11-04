import React from 'react';
import './profile.css';
import { useParams } from "react-router-dom";

export function Profile() {
    const { username } = useParams();

    return (
      <main>
            <div className="profile-card-div">
                <img src="Mario.png" style={{ width: "75px", height: "75px" }} alt="Mario" />
                <span>{ username }</span>
            </div>
            <div className="profile-info-div">
                <p>Mains: Mario, Luigi</p>
                <p>Win Rate: 50%</p>
            </div>
            <div className="profile-feed-div">
                <p>Recent Posts go here</p>
            </div>
        </main>
    );
}