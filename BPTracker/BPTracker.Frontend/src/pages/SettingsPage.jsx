import { useNavigate } from 'react-router-dom';
import {removeToken} from "../api/AuthService.js";

function RegisterPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <div>
            <h2 className="text-4xl mb-8 mt-4 font-bold text-center text-textMain">Settings</h2>
            <button onClick={handleLogout} style={{ marginBottom: '2rem' }}>
                Logout
            </button>        </div>
    )
}
export default RegisterPage;