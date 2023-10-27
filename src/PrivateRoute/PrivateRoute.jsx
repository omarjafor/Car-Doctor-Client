import useHook from "../useHook/useHook";
import { Navigate } from 'react-router';

const PrivateRoute = ( {children} ) => {
    const { user, loading } = useHook();

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }
    return <Navigate to='/login' replace></Navigate>
};

export default PrivateRoute;