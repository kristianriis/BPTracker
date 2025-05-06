import { Outlet, Link, useNavigate } from "react-router-dom";
import { removeToken} from "../api/AuthService.js";

function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };


    return(
        <div>
            <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
                <Link to="/readings" style={{ marginRight: '1rem' }}>Readings</Link>
                <Link to="/stats" style={{ marginRight: '1rem' }}>Stats</Link>
                <Link to="/settings" style={{ marginRight: '1rem' }}>Settings</Link>
            </nav>

            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </div>

    )
}

export default MainLayout;