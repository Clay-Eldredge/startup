import React from 'react';
import 'login.css';

export function Login() {
    return (
      <main>
            <div class="login-div">
                <form>
                    <fieldset>
                        <legend>Login (this will use a database)</legend>
                        <div>
                            <label>Username</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password"></input>
                        </div>
                        <button>Log in</button>
                    </fieldset>
                </form>
            </div>
        </main>
    );
}