import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DriverPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Check if user is logged in and is an driver
    const isDriver = userInfo && userInfo.role === 'Driver';
  
    // Render the protected routes only if the user is logged in and is an driver
    return isDriver ? <Outlet /> : <Navigate to='/login' replace />;
};

export default DriverPrivateRoute;