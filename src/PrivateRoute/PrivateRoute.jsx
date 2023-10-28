import useHook from "../useHook/useHook";
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ( {children} ) => {
    const { user, loading } = useHook();
    const location = useLocation()

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }
    return <Navigate to='/login' state={location.pathname} replace></Navigate>
};

export default PrivateRoute;