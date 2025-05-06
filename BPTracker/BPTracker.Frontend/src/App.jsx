import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ReadingsPage from "./pages/ReadingsPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage />} />


                <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                <Route path="readings" element={<ReadingsPage />} />
                <Route path="stats" element={<StatsPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>


                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;