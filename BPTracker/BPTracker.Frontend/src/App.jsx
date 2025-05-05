import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import {isLoggedIn} from "./api/AuthService.js";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/dashboard"
                    element={<PrivateRoute> <DashboardPage /> </PrivateRoute>}
                />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;