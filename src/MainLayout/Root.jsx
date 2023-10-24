import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div>
            <div> <h1 className="text-3xl font-bold text-center">Hello world!</h1></div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;