import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Feed } from './feed/feed';
import { Characters } from './characters/characters';
import { Profile } from './profile/profile';
import { AuthState } from './login/authState';
import { useLocalStorage } from './useLocalStorage';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState); 


  return (
    <BrowserRouter>
      <header>
        <div>
          <img src="/Smash_Ball.png" alt="Smash Ball" />
          <NavLink className="logo" to="/">SmashTalk</NavLink>
        </div>
        <nav className="header">
          {authState === AuthState.Authenticated && (<NavLink to="/feed">Feed</NavLink>)}
          {authState === AuthState.Authenticated && (<NavLink to="/characters">Characters</NavLink>)}
          {authState === AuthState.Authenticated && (<NavLink to="/profile">Profile</NavLink>)}
        </nav>
      </header>

      <Routes>
        <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
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
