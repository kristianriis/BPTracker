import { useEffect, useState } from 'react';
import api from '../api/axios';
import { getToken, removeToken } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const [entries, setEntries] = useState([]);
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [pulse, setPulse] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();
    const [editingId, setEditingId] = useState(null);
    const [editedEntry, setEditedEntry] = useState({});


    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await api.get('/BloodPressure');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries', error);
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/BloodPressure/${id}`);
            fetchEntries();
        }
        catch (error) {
            console.error('Failed to delete entries from DB', error);
        }
    }

    const startEdit = (entry) => {
        setEditingId(entry.id);
        setEditedEntry({...entry});
    }


    const handleSave = async (id) => {
        try {
            await api.put(`/BloodPressure/${id}`,{
                systolic: parseInt(editedEntry.systolic),
                diastolic: parseInt(editedEntry.diastolic),
                pulse: parseInt(editedEntry.pulse),
                notes: editedEntry.notes
            });

            setEditingId(null);
            fetchEntries();
        }
        catch (error) {
            console.error('Failed to update entries from DB', error);
        }
    }

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

            {/* Entries Table */}
            {entries.length > 0 ? (
                <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Systolic</th>
                        <th>Diastolic</th>
                        <th>Pulse</th>
                        <th>Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{new Date(entry.time).toLocaleString()}</td>

                            {editingId === entry.id ? (
                                <>
                                    <td><input type="number" value={editedEntry.systolic} onChange={(e) => setEditedEntry({ ...editedEntry, systolic: e.target.value })} /></td>
                                    <td><input type="number" value={editedEntry.diastolic} onChange={(e) => setEditedEntry({ ...editedEntry, diastolic: e.target.value })} /></td>
                                    <td><input type="number" value={editedEntry.pulse} onChange={(e) => setEditedEntry({ ...editedEntry, pulse: e.target.value })} /></td>
                                    <td><input type="text" value={editedEntry.notes} onChange={(e) => setEditedEntry({ ...editedEntry, notes: e.target.value })} /></td>
                                    <td>
                                        <button onClick={() => handleSave(entry.id)}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{entry.systolic}</td>
                                    <td>{entry.diastolic}</td>
                                    <td>{entry.pulse}</td>
                                    <td>{entry.notes}</td>
                                    <td>
                                        <button onClick={() => startEdit(entry)}>Edit</button>
                                        <button onClick={() => handleDelete(entry.id)} style={{ color: 'red' }}>Delete</button>
                                    </td>
                                </>
                            )}
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