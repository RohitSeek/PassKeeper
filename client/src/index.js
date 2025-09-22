import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import Passwords from './Pages/Passwords/Passwords';
import Logout from './Pages/Logout/Logout';
import PasswordContextProvider from './store/Context/PasswordContextProvider';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/passwords' element={<Passwords/>}/>
      <Route path='/logout' element={<Logout/>}/> 
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <PasswordContextProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
      </PasswordContextProvider>
    // </React.StrictMode> 
);

