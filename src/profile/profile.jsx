import React from 'react';
import './profile.css';
import { useParams } from "react-router-dom";

export function Profile() {
    const { username } = useParams();

    return (
      <main>
            Coming soon...
        </main>
    );
}