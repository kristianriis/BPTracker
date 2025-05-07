import {Outlet, Link, useNavigate} from "react-router-dom";
import {removeToken} from "../api/AuthService.js";

function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };


    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            <aside style={{position: 'fixed', top: '0', left: 0, backgroundColor: 'white', width: '100px', height: '100vh', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '2px 0 5px rgba(0,0,0,0.5)', zIndex: 1000}}>
                <nav style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    <Link to="/dashboard" style={{marginRight: '1rem'}}>Dashboard</Link>
                    <Link to="/readings" style={{marginRight: '1rem'}}>Readings</Link>
                    <Link to="/stats" style={{marginRight: '1rem'}}>Stats</Link>
                    <Link to="/settings" style={{marginRight: '1rem'}}>Settings</Link>
                </nav>
            </aside>


            <main style={{flex: 1, padding: '2rem', maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'column'}}>
                <Outlet/>
            </main>

            <footer style={{marginTop: 'auto', textAlign: 'center', padding: '2rem'}}>
                <small>BPTracker © 2025</small>
            </footer>
        </div>
    )
}

export default MainLayout;