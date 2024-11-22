import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Check if user is logged in and is an customer
    const isCustomer = userInfo && userInfo.role === 'Customer';
  
    // Render the protected routes only if the user is logged in and is an customer
    return isCustomer ? <Outlet /> : <Navigate to='/login' replace />;
};

export default CustomerPrivateRoute;