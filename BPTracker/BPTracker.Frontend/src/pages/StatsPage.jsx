import {useEffect, useState} from 'react';
import api from '../api/axios';
import {getToken, removeToken} from '../api/AuthService';
import {useNavigate} from 'react-router-dom';
import StatCard from '../components/StatCard';

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

    const [entries, setEntries] = useState([]);
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

    const average = (key) => {
        if (entries.length === 0) return 0;
        const total = entries.reduce((sum, e) => sum + Number(e[key]), 0);
        return Math.round(total / entries.length);
    };

    const high = (key) => {
        if(!Array.isArray(entries) || entries.length === 0) return 0;
        return Math.max(...entries.map(e=>Number(e[key])));
    }

    const low = (key) => {
        if(!Array.isArray(entries) || entries.length === 0) return 0;
        return Math.min(...entries.map(e=>Number(e[key])));
    }

    const maxSystolic = high('systolic') ;
    const maxDiastolic = high('diastolic');
    const maxPulse = high('pulse');

    const minPulse = low('pulse');
    const minSystolic = low('systolic');
    const minDiastolic = low('diastolic');

    const avgSystolic = average('systolic');
    const avgDiastolic = average('diastolic');
    const avgPulse = average('pulse');


    return (
        <div>
            <h2 className="text-4xl mb-8 mt-4 font-bold text-center text-textMain">Insights</h2>


            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Max systolic" value={maxSystolic}></StatCard>
                <StatCard label="Max diastolic" value={maxDiastolic}></StatCard>
                <StatCard label="Max pulse" value={maxPulse}></StatCard>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
                <StatCard label="Min systolic" value={minSystolic}></StatCard>
                <StatCard label="Min diastolic" value={minDiastolic}></StatCard>
                <StatCard label="Min pulse" value={minPulse}></StatCard>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
                <StatCard label="Avg systolic" value={avgSystolic}></StatCard>
                <StatCard label="Avg diastolic" value={avgDiastolic}></StatCard>
                <StatCard label="Avg pulse" value={avgPulse}></StatCard>
            </div>



            <ResponsiveContainer width="100%" height={350} className="mt-20">
                <LineChart data={entries}>
                    <XAxis
                        dataKey="time"
                        tickFormatter={(tick) =>
                            new Date(tick).toLocaleDateString(undefined, {day: 'numeric', month: 'short'})
                        }
                    />
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic"/>
                    <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic"/>
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
};

export default StatsPage;