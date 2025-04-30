import {useState} from "react";
import api from "../api/axios";
import {useNavigate, useNavigation} from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('/auth/register', {username, password});
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError('Registration failed - username might be taken')
        }
    };

    return (

    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <form onSubmit={handleRegister} style={{
            padding: '2rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '100%'
        }}>
            <h2 style={{textAlign: 'center'}}>Register</h2>

            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

            <div style={{marginBottom: '1rem'}}>
                <label>Username:</label><br/>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{width: '100%'}}
                />
            </div>

            <div style={{marginBottom: '1rem'}}>
                <label>Password:</label><br/>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{width: '100%'}}
                />
            </div>

            <button type="submit" style={{width: '100%'}}>Register</button>
        </form>
    </div>
);
}
export default RegisterPage;