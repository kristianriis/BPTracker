import { useState } from 'react';
import api from '../api/axios';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });

            const token = response.data.token;
            console.log('Token received:', token);

            localStorage.setItem('token', token);
            alert('Logged in successfully');
        } catch (err) {
            console.error(err);
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                padding: '2rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 style={{ textAlign: 'center'}}>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <form
                    onSubmit={handleLogin}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Username:</label><br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '92%',
                                padding: '0.5rem',
                                margin: '0 auto',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Password:</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '92%',
                                padding: '0.5rem',
                                margin : '0 auto',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
