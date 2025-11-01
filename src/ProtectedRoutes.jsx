import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = async ({isAuthorized}) => {

    if(!isAuthorized){
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;