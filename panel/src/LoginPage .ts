import React, { useState } from 'react';
import { Refine}

import { useLogin } from '@pankod/refine';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();

    return (
        <div>
            <h1>Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ username, password });
                }}
            >
                <label>
                    Username
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
