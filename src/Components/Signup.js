import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleSignUp = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post("http://localhost:4000/user/signup", data)
      .then((res) => console.log(res.data));
    navigate("/blogs");
    
    // toast.success("Signup Successful");
  };
  return (
    <div>
      <form className="signin-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            id="password-field"
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <span
                        toggle="#password-field"
                        className="fa fa-fw fa-eye field-icon toggle-password"
                      ></span> */}
        </div>
        <div className="form-group">
          <input
            id="cpassword-field"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <span
                        toggle="#password-field"
                        className="fa fa-fw fa-eye field-icon toggle-password"
                      ></span> */}
        </div>
        <div className="form-group">
          <button
            className="form-control btn btn-primary  px-3"
            onClick={toggleSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
