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
            <button onClick={handleLogout} style={{ marginBottom: '2rem' }}>
                Logout
            </button>        </div>
    )
}
export default RegisterPage;