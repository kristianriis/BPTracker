import { useEffect, useState } from 'react';
import api from '../api/axios';
import { getToken, removeToken } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';


function DashboardPage() {
    const [entries, setEntries] = useState([]);
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [pulse, setPulse] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();
    const [editingId, setEditingId] = useState(null);
    const [editedEntry, setEditedEntry] = useState({});

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    const handleAddEntry = async (e) => {
        e.preventDefault();

        try {
            await api.post('/BloodPressure', {
                systolic: parseInt(systolic),
                diastolic: parseInt(diastolic),
                Pulse: parseInt(pulse),
                Notes: notes
            });

            setSystolic('');
            setDiastolic('');
            setPulse('');
            setNotes('')
            fetchEntries(); // refresh the list
        } catch (error) {
            console.error('Error adding entry', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Dashboard</h2>
            <button onClick={handleLogout} style={{ marginBottom: '2rem' }}>
                Logout
            </button>

            {/* New Entry Form */}
            <form onSubmit={handleAddEntry} style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Systolic:</label><br />
                    <input
                        type="number"
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Diastolic:</label><br />
                    <input
                        type="number"
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Pulse:</label><br />
                    <input
                        type="number"
                        value={pulse}
                        onChange={(e) => setPulse(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Notes:</label><br />
                    <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <button type="submit">Add Entry</button>
            </form>
        </div>
    );
}

export default DashboardPage;