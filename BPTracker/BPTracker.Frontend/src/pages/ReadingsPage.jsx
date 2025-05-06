import { useEffect, useState } from 'react';
import api from '../api/axios';

function ReadingsPage() {
    const [entries, setEntries] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedEntry, setEditedEntry] = useState({
        systolic: '',
        diastolic: '',
        pulse: '',
        notes: ''
    });

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

    const handleSave = async (id) => {
        try {
            await api.put(`/BloodPressure/${id}`, {
                ...editedEntry,
                systolic: parseInt(editedEntry.systolic),
                diastolic: parseInt(editedEntry.diastolic),
                pulse: parseInt(editedEntry.pulse),
            });
            setEditingId(null);
            setEditedEntry({
                systolic: '',
                diastolic: '',
                pulse: '',
                notes: ''
            });
            fetchEntries();
        }
        catch (error) {
            console.error('Error fetching entries', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/BloodPressure/${id}`);
            fetchEntries();
        } catch (error) {
            console.error('Error fetching entries', error);
        }
    };

    return(
        <div>
            <h2>Readings</h2>
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
    )
}
export default ReadingsPage;