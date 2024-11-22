import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './components/home/Home';

import User from './components/User Management/getuser/User';
import Add from './components/User Management/adduser/Add';
import Edit from './components/User Management/updateuser/Edit';

import Booking from './components/Vehicle Reservation Management/getbooking/Booking';
import AddBooking from './components/Vehicle Reservation Management/addbooking/AddBooking';
import EditBooking from './components/Vehicle Reservation Management/updatebooking/EditBooking';

import Vehicle from './components/Vehicle Inventory Management/getvehicle/Vehicle';
import AddVehicle from './components/Vehicle Inventory Management/addvehicle/AddVehicle';
import EditVehicle from './components/Vehicle Inventory Management/updatevehicle/EditVehicle';

import Package from "./components/Vehicle Package Management/getpackage/Package";
import AddPackage from './components/Vehicle Package Management/addpackage/AddPackage';
import EditPackage from './components/Vehicle Package Management/updatepackage/EditPackage';

import CusPackage from './components/Customize Package Management/getcuspackage/CusPackage';
import EditCusPackage from './components/Customize Package Management/updatecuspackage/EditCusPackage';

import Feedback from "./components/Feedback and Rating Management/getfeedback/Feedback";
import CusFeedback from "./components/Feedback and Rating Management/getfeedbackbycustomer/CusFeedback";
import AddFeedback from './components/Feedback and Rating Management/addfeedback/AddFeedback';
import EditFeedback from './components/Feedback and Rating Management/updatefeedback/EditFeedback';

import Maintenance from './components/Vehicle Maintenance Management/getmaintenance/Maintenance';
import AddMaintenance from './components/Vehicle Maintenance Management/addmaintenance/AddMaintenance';
import EditMaintenance from './components/Vehicle Maintenance Management/updatemaintenance/EditMaintenance';

import Loyalty from './components/Customer Loyalty Management/getloyalty/Loyalty';
import AddLoyalty from './components/Customer Loyalty Management/addloyalty/AddLoyalty';
import EditLoyalty from './components/Customer Loyalty Management/updatemaintenance/EditLoyalty';


function App() {

  const route = createBrowserRouter([
    {
      path: "/home", element: <Home />,
    },

    {
      path: "/", element: <User />,
    },
    {
      path: "/add", element: <Add />,
    },
    {
      path: "/edit/:id", element: <Edit />,
    },

    {
      path: "/vehicle", element: <Vehicle />,
    },
    {
      path: "/addvehicle", element: <AddVehicle />,
    },
    {
      path: "/editvehicle/:id", element: <EditVehicle />,
    },

    {
      path: "/booking", element: <Booking />,
    },
    {
      path: "/addbooking", element: <AddBooking />,
    },
    {
      path: "/editbooking/:id", element: <EditBooking />,
    },

    {
      path: "/package", element: <Package />,
    },
    {
      path: "/addpackage", element: <AddPackage />,
    },
    {
      path: "/editpackage/:id", element: <EditPackage />,
    },

    {
      path: "/cuspackage", element: <CusPackage />,
    },
    {
      path: "/editcuspackage/:id", element: <EditCusPackage />,
    },

    {
      path: "/feedback", element: <Feedback />,
    },
    {
      path: "/cusfeedback", element: <CusFeedback />,
    },
    {
      path: "/addfeedback", element: <AddFeedback />,
    },
    {
      path: "/editfeedback/:id", element: <EditFeedback />,
    },


    {
      path: "/maintenance", element: <Maintenance />,
    },
    {
      path: "/addmaintenance", element: <AddMaintenance />,
    },
    {
      path: "/editmaintenance/:id", element: <EditMaintenance />,
    },



    {
      path: "/loyalty", element: <Loyalty />,
    },
    {
      path: "/addloyalty", element: <AddLoyalty />,
    },
    {
      path: "/editloyalty/:id", element: <EditLoyalty />,
    },


  ])

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
