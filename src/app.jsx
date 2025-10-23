import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Feed } from './feed/feed';
import { Characters } from './characters/characters';
import { Profile } from './profile/profile';
import { useLocalStorage } from './useLocalStorage';

export default function App() {
  const [username, setUsername] = useLocalStorage("username", "");

  // Automatically set username on first load
  useEffect(() => {
    if (!username) {
      setUsername("test_username");
    }
  }, [username, setUsername]);

  return (
    <BrowserRouter>
      <header>
        <div>
          <img src="/Smash_Ball.png" alt="Smash Ball" />
          <NavLink className="logo" to="/">SmashTalk</NavLink>
        </div>
        <nav className="header">
          <NavLink to="/feed">Feed</NavLink>
          <NavLink to="/characters">Characters</NavLink>
          <NavLink to="/profile">{username || "Profile"}</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/characters' element={<Characters />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
        <a href="https://github.com/Clay-Eldredge/startup">Github</a>
        <span>Developed by Clay Eldredge</span>
      </footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
