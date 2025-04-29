// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { getToken, removeToken } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await api.get('/BloodPressure');
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching entries', error);
            }
        };

        fetchEntries();
    }, []);

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Dashboard</h2>
            <button onClick={handleLogout} style={{ marginBottom: '2rem' }}>
                Logout
            </button>

            {entries.length > 0 ? (
                <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Systolic</th>
                        <th>Diastolic</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{new Date(entry.time).toLocaleString()}</td>
                            <td>{entry.systolic}</td>
                            <td>{entry.diastolic}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No blood pressure entries found.</p>
            )}
        </div>
    );
}

export default DashboardPage;