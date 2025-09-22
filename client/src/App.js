/***
 * Dobuts 1) useEffect pure child comp execute hone ke baad hota hain to yeha par navbar or outlet ke pehle useEffect calling 2wice (why before )
 * d-2) when try to add new password then not showing that
 * d-3) use is logged in still in navbar signin signup showing
 */



import React, { useContext, useEffect } from "react";
import './App.css';
import {Outlet } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setName, setEmail, setPasswords } from "./redux/actions";
import { checkAuthenticated } from "./axios/instance";
import { passwordContext } from "./store/Context/PasswordContextProvider";
 

function App()
{
  const {setAuth,setName,setEmail,setPasswords,state}=useContext(passwordContext)
  // const isAuthenticated = useSelector(state => state.isAuthenticated);
  // const dispatch = useDispatch(); 
  const {name,isAuthenticated,passwords}=state
  // console.log("isAuth ",isAuthenticated);
  
  useEffect(() =>
  {
     
    
    const verifyUser = async () =>
    {
      try {
          const res = await checkAuthenticated();
          if (res.status === 200) {
            const { name, email, passwords } = res.data;
            setAuth(true);
            setName(name);
            setEmail(email);
            setPasswords(passwords);
          }
       } 
      catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized user");
          setAuth(false);
        } else {
          console.log("Other error", error);
        }
      }
    };
    verifyUser();
  }, [isAuthenticated]);               //itentionally keeping it empty isAuth and other states can put

  return (
    <div className="App">
         <Navbar />
         <Outlet/>
   </div>
  );
}

export default App;
