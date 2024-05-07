import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import ReportScreen from './screens/Reports.jsx'
import NewMaintenance from './screens/NewMaintenance.jsx'
import EditSpare from './screens/EditSpare.jsx'
import SpareParts from './screens/HomeSpare.jsx'
import NewSpare from './screens/newSpare.jsx'
//import EditMaintain from './screens/EditMaintain.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/reports' element={<ReportScreen />} />
      <Route path='/maintain' element={<NewMaintenance />} />
      {/* <Route path='/edit/:id' element={<EditMaintain />} /> */}
      <Route path='/spare-parts' element={<SpareParts/>}/>
      <Route path='/create' element={<NewSpare/>} />
      <Route path='/update/:id' element={<EditSpare/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
