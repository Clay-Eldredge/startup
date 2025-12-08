import React, { useEffect, useState } from 'react';

export default function OnlineUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        const host = window.location.hostname;

        const socket = new WebSocket(`${protocol}://${host}:4000`);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "online_users") {
                setUsers(data.users);
            }
        };

        return () => socket.close();
    }, []);

    return (
        <div className="online-users-container">
            <h4 className="online-users-title">Online Users</h4>
            <ul>
                {users.map(u => <li className="online-user" key={u}>{u}</li>)}
            </ul>
        </div>
    );

}
