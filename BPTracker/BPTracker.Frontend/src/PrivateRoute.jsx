import { Navigate } from 'react-router-dom';
import { getToken} from "./api/AuthService.js";

const PrivateRoute = ({ children }) => {
    const token = getToken();

    if(!token)
    {
        return <Navigate to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;