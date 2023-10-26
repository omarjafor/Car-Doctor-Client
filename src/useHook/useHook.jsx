import { useContext } from "react";
import { AuthContext } from './../AuthProvider/AuthProvider';

const useHook = () => {
    const all = useContext(AuthContext);
    return all;
};

export default useHook;