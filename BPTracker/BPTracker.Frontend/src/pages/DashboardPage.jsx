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
        <div>
            <h2 className="text-4xl mb-8 mt-4 font-bold text-center text-textMain">Add data</h2>

            {/* New Entry */}
            <form className="text-textMain" onSubmit={handleAddEntry}>
                <div className="mb-2 text-textMain">
                    <label className="text-textMain">Systolic:</label><br />
                    <input className="mt-2 w-full px-4 py-2 rounded-lg text-textMain bg-primary  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                           type="number"
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="text-textMain">Diastolic:</label><br />
                    <input className="mt-2 w-full px-4 py-2 rounded-lg text-textMain bg-primary  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"

                           type="number"
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="text-textMain">Pulse:</label><br />
                    <input className="mt-2 w-full px-4 py-2 rounded-lg text-textMain bg-primary text-textMain border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"

                           type="number"
                        value={pulse}
                        onChange={(e) => setPulse(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="text-textMain">Notes:</label><br />
                    <textarea
                        className="mt-2 w-full px-4 py-2 rounded-lg text-textMain bg-primary  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <button className="text-secondary" type="submit">Add Entry</button>
            </form>
        </div>
    );
}

export default DashboardPage;