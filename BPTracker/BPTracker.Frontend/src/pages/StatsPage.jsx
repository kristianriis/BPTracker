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

function StatsPage() {

    const [entries, setEntries] = useState({});
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

return(
    <div>
    <h3>Blood Pressure Over Time</h3>
<ResponsiveContainer width="100%" height={300}>
    <LineChart data={entries}>
        <XAxis
            dataKey="time"
            tickFormatter={(tick) =>
                new Date(tick).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
            }
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
        <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
    </LineChart>
</ResponsiveContainer>
    </div>
);
};

export default StatsPage;