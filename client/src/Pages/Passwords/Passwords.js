import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Password from "../../Components/Password/Password";
import "./Passwords.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveNewPassword, checkAuthenticated } from "../../axios/instance";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setPasswords } from "../../redux/actions";
import { passwordContext } from "../../store/Context/PasswordContextProvider";
import axios from "axios";
console.log("oin react password.js hit");

console.log("axios base url ",axios.defaults.baseURL);

function Passwords() {
  const [platform, setPlatform] = useState("fara");
  const [platEmail, setPlatEmail] = useState("gadaga@asfa");
  const [platPass, setPlatPass] = useState("afssafa");

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
 
  const { state,setPasswords}=useContext(passwordContext) 
  const {isAuthenticated, name, email,passwords}=state
// console.log("in password.js passwords ",passwords);



  const verifyUser = async () => {
    try {
      const res = await checkAuthenticated();
      console.log("root user ",res);
      
      const { password:newPasswords } = res.data;
      console.log("new passwords are ",newPasswords);
      
         setPasswords(newPasswords);
      }
     catch (error) {
      // setAuth(false)
      console.log(error);
    }
  };

  const addNewPassword = async () => {
    debugger
    console.log("called addnew");
    
    
    try {
      const data = {
        platform: platform,
        userPass: platPass,
        platEmail: platEmail,
        userEmail: email,
      };
        // on success recieved complete document of user for logged in user 
      const res = await axios({
        url: "http://localhost:8000/addnewpassword",
        data,
        method: "POST",
        withCredentials: true

      });
      console.log("res ",res);
      
      
      
      if (res.status === 200) {
      
        // setOpen(false);
        console.log("new passwords data saved ",res);
        // verifyUser();
        // setPasswords(newPasswords);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // setPlatform("");
        // setPlatEmail("");
        // setPlatPass("");
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  // useEffect(() => {
  //   !isAuthenticated && navigate("/signin", { replace: true });
  // }, [isAuthenticated, navigate]);

  return (
    <div className="passwords">
      <ToastContainer />
      <h1>
        Welcome <span className="name"> {name} </span>{" "}
      </h1>

      <div className="modal">
        <button className="modalButton" onClick={() => setOpen(true)}>
          Add New Password
        </button>

        <Modal open={open}>
          <h2>Add a new password</h2>
          <form className="form">
            <div className="form__inputs">
              <label> Platform </label>
              <input
                type="text"
                placeholder="E.g. Facebook"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              />
            </div>

            <div className="form__inputs">
              <label> Email </label>
              <input
                type="email"
                placeholder="E.g. sham9090@gmail.com"
                value={platEmail}
                onChange={(e) => setPlatEmail(e.target.value)}
                required
              />
            </div>

            <div className="form__inputs">
              <label> Password </label>
              <input
                type="password"
                placeholder="Password"
                value={platPass}
                onChange={(e) => setPlatPass(e.target.value)}
                required
              />
            </div>

            <button onClick={addNewPassword}> Add </button>
          </form>
        </Modal>
      </div>

      <hr />

      <div className="passwords__list">
        {passwords?.length !== 0 ? (
          passwords?.map((data) => {
            return (
              <Password
                key={data._id}
                id={data._id}
                name={data.platform}
                password={data.password}
                email={data.platEmail}
                iv={data.iv}
              />
            );
          })
        ) : (
          <div className="nopass">
            <p> You have not added any passwords yet. </p>
            <button className="modalButton" onClick={() => setOpen(true)}>
              {" "}
              Try Adding a password now{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Passwords;
