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

    const startEdit = (entry) => {
        setEditingId(entry.id);
        setEditedEntry({
            systolic: entry.systolic.toString(),
            diastolic: entry.diastolic.toString(),
            pulse: entry.pulse.toString(),
            notes: entry.notes || ''
        });
    };

    return(
        <div className="space-y-4">
            <h2 className="text-4xl mb-8 mt-4 font-bold text-center text-textMain">Your data</h2>

            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="p-4 bg-primary rounded-lg shadow-md border border-gray-700"
                >
                    <div className="text-sm text-textMain mb-2">
                        {new Date(entry.time).toLocaleString()}
                    </div>

                    {editingId === entry.id ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 ">
                                <input
                                    type="number"
                                    value={editedEntry.systolic}
                                    onChange={(e) => setEditedEntry({ ...editedEntry, systolic: e.target.value })}
                                    className="p-2 rounded bg-gray-700 text-textMain focus:outline-none focus:ring-2 focus:ring-orange-600"
                                    placeholder="Systolic"
                                />
                                <input
                                    type="number"
                                    value={editedEntry.diastolic}
                                    onChange={(e) => setEditedEntry({ ...editedEntry, diastolic: e.target.value })}
                                    className="p-2 rounded bg-gray-700 text-textMain focus:outline-none focus:ring-2 focus:ring-orange-600"
                                    placeholder="Diastolic"
                                />
                                <input
                                    type="number"
                                    value={editedEntry.pulse}
                                    onChange={(e) => setEditedEntry({ ...editedEntry, pulse: e.target.value })}
                                    className="p-2 rounded bg-gray-700 text-textMain focus:outline-none focus:ring-2 focus:ring-orange-600"
                                    placeholder="Pulse"
                                />
                                <input
                                    type="text"
                                    value={editedEntry.notes}
                                    onChange={(e) => setEditedEntry({ ...editedEntry, notes: e.target.value })}
                                    className="p-2 rounded bg-gray-700 text-textMain col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                                    placeholder="Notes"
                                />
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => handleSave(entry.id)} className="px-4 py-2 bg-green-600 rounded">Save</button>
                                <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-2 text-sm text-textMain">
                                <div>Systolic: {entry.systolic}</div>
                                <div>Diastolic: {entry.diastolic}</div>
                                <div>Pulse: {entry.pulse}</div>
                                <div>Notes: {entry.notes}</div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => startEdit(entry)} className="px-4 py-2 bg-cyan-800 rounded text-primary hover:border-white">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(entry.id)} className="px-4 py-2 bg-orange-700 rounded text-primary hover:border-white">Delete</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
export default ReadingsPage;