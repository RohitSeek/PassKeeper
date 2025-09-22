import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../axios/instance';
import { useDispatch } from "react-redux";
import { setAuth } from '../../redux/actions';
import { passwordContext } from '../../store/Context/PasswordContextProvider';


function Logout()
{

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const {setAuth}=useContext(passwordContext);
    useEffect(() =>
    {
        const logout = async () =>
        {
            try
            {
                const res = await logoutUser();
                if (res.status === 200)
                { 
                    setAuth(false);
                    navigate("/signin");
                }
                else
                {
                    throw new Error("Could not logout the user.")
                }
            }
            catch (err)
            {
                console.log(err)
            }
        }
        logout();

    }, [navigate])
    return (
        <div className="logout">
            Logging you out...
        </div>
    )
}

export default Logout;
