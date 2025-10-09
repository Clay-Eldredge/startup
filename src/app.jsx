import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Feed } from './feed/feed';
import { Characters } from './characters/characters';
import { Profile } from './profile/profile';

export default function App() {
  return (
    <BrowserRouter>
      <header>
            <div>
                <img src="/Smash_Ball.png" ></img>
                <NavLink className="logo" to="/index.html">SmashTalk</NavLink>
            </div>
            <nav class="header">
                <a href="/feed.html">Feed</a>
                <a href="/characters.html">Characters</a>
                <a href="/profile.html">Profile (replace with username)</a>
            </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/play' element={<Play />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/about' element={<About />} />
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
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}