import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import {isLoggedIn} from "./api/AuthService.js";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={isLoggedIn() ? <DashboardPage /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;