import { Navigate } from 'react-router-dom';
import { getToken } from '../lib/auth';

export default function RequireAdmin({ children }) {
    if (!getToken()) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
}