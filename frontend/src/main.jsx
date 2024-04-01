import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';

import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';

import ProfileScreen from './screens/ProfileScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import EVehicleScreen from './screens/EVehicleScreen.jsx';
import PackageScreen from './screens/PackageScreen.jsx';
import PackageHomeScreen from './screens/PackageHomeScreen.jsx';
import ReservationScreen from './screens/ReservationScreen.jsx';
import MaintenanceScreen from './screens/MaintenanceScreen.jsx';
import DamageScreen from './screens/DamageScreen.jsx';
import FeedbackRatingScreen from './screens/FeedbackRatingScreen.jsx';
import LoyaltyScreen from './screens/LoyaltyScreen.jsx';

import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import AdminDashboardScreen from './screens/AdminDashboardScreen.jsx';
import UserReport from './screens/UserReport.jsx';

import E_CarsPage from './pages/E_CarsPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      {/* User Routes  */}
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Product Routes */}

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
        <Route path='/vehicles' element={<EVehicleScreen />} />
        <Route path='/packages' element={<PackageScreen />} />
        <Route path='/packageshome' element={<PackageHomeScreen />} />
        <Route path='/reservation' element={<ReservationScreen />} />
        <Route path='/maintenance' element={<MaintenanceScreen />} />
        <Route path='/incident' element={<DamageScreen />} />
        <Route path='/feedback' element={<FeedbackRatingScreen />} />
        <Route path='/loyalty' element={<LoyaltyScreen />} />

        {/* Vehicle Types */}
        <Route path='/ecars' element={<E_CarsPage />} />

      </Route>

      {/* Private Routes */}
      <Route path='' element={<AdminPrivateRoute />}>
        <Route path='/admindashboard' element={<AdminDashboardScreen />} />
        <Route path='/usersReport' element={<UserReport />} />
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
