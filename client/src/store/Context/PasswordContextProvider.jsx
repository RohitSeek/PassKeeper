import { createContext,useReducer } from "react";
import { PasswordReducer } from "../Reducer/PasswordReducer"; 
import { deleteAPassword } from "../../axios/instance";
import { deleteAPasswordDispatcher, setAuthDispatcher, setEmailDispatcher, setNameDispatcher, setPasswordsDispatcher } from "../Dispatcher/PasswordDispatcher"; 
export const passwordContext=createContext( {
  isAuthenticated:false,
  setName: () => {},
  setAuth: () => {},
  setEmail: () => {},
  setPasswords: () => {},
  deleteAPassword: () => {}
}
);

const intitalState={
  isAuthenticated: false,
  name: "",
  email: "",
  passwords: []
}


export default function PasswordContextProvider({children}) {
const [state,dispatch]=useReducer(PasswordReducer,intitalState);
 
  const setAuth = (auth)=>{
        setAuthDispatcher({dispatch,auth});
  }
  const setName = (name)=>{
    setNameDispatcher({dispatch,name});
  }
  const setEmail = (email)=>{
    setEmailDispatcher({dispatch,email});
  }
  const  setPasswords= (passwords)=>{
    // console.log(" passowrd in pro ",passwords);
    
    setPasswordsDispatcher({dispatch,passwords});
  }
  const deleteAPassword=(id)=>{
    deleteAPasswordDispatcher({dispatch,id});
  }


  return (
    <passwordContext.Provider value={{state,setAuth,setName,setEmail,setPasswords,deleteAPassword}}>
        {children}
      </passwordContext.Provider>
  );
}