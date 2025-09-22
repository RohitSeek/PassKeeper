import React, { useState, useEffect, useContext } from 'react';
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/signup.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupUser } from '../../axios/instance';
import ReactLoading from 'react-loading';
import { passwordContext } from '../../store/Context/PasswordContextProvider';

function Signup() {
  const { state } = useContext(passwordContext);
  const { isAuthenticated } = state;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation rules
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Full name is required.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = "Email is required.";
        else if (!emailRegex.test(value)) error = "Enter a valid email.";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 6) error = "Password must be at least 6 characters.";
        break;
      case "cpassword":
        if (!value) error = "Confirm Password is required.";
        else if (value !== userData.password) error = "Passwords do not match.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update userData
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));

    // validate instantly
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleRegister = async () => {
    // final validation check before submit
    let newErrors = {};
    Object.keys(userData).forEach((key) => {
      const error = validateField(key, userData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // stop if errors

    setIsLoading(true);
    try {
      const res = await signupUser(userData);
      if (res.status === 200) {
        setUserData({ name: "", email: "", password: "", cpassword: "" });
        toast.success(res.data.message, { position: "top-right", autoClose: 5000 });
        navigate("/signin");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isAuthenticated && navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="signup">
      <ToastContainer />
      <div className="signup__wrapper">

        <div className="signup__left">

          <div className="inputs">
            <label> Full Name </label>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              value={userData.name}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="inputs">
            <label> Email </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              value={userData.email}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="inputs">
            <label> Password </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={userData.password}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="inputs">
            <label> Confirm Password </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              onChange={handleChange}
              value={userData.cpassword}
            />
            {errors.cpassword && <p className="error-text">{errors.cpassword}</p>}
          </div>

          <p>
            Already have an account? <Link to="/signin">Login</Link>
          </p>

          {isLoading && <ReactLoading type="balls" color="#ff1f5a" height={20} width={20} />}
          <button onClick={handleRegister}> SignUp </button>
        </div>

        <div className="signup__right">
          <img src={img} alt="login.jpg" />
          <div className="signup__content">
            <h1> SignUp </h1>
            <h4> Get your password secured with us for free. </h4>
            <p> Already have an account ? <Link to="/signin"> Login </Link> </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
