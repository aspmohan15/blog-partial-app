import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Axios from "axios";
import Signup from "./Signup";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const responseGoogle = (data) => {
    if (data.profileObj) {
      toast("🦄 Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/blogs", {
        state: { datas: data.profileObj, email: data.profileObj.email },
      });
    } else navigate("/");
  };
  const bgimg = "/images/bg.jpg";

  //   useEffect(() => {
  //     const getuser = async () => {
  //       const data = { email: email, password: password };
  //       const response = await Axios.post("http://localhost:5000/login", data);
  //       console.log(response.data);
  //     };
  //   }, [input]);

  //after sing in clicks
  const toggleSignIn = () => {
    const data = { email: email, password: password };

    Axios.post("http://localhost:4000/users/login", data).then((res) => {
      console.log(res.data.message);
      if (res.data.message) {
        toast(`🦄 ${res.data.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast(`🦄 Login Success!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(res.data);
        navigate("/blogs", {
          state: { datas: res.data },
        });
      }
    });
  };

  const toggleSignUp = () => {
    setSignup(!signup);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <div
        className="img js-fullheight"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">Blog Login</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap p-0">
                  <h3 className="mb-4 text-center">Have an account?</h3>
                  {signup ? (
                    <Signup />
                  ) : (
                    <div className="signin-form">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
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
                      </div>

                      <div className="form-group">
                        <button
                          className="form-control btn btn-primary  px-3"
                          onClick={toggleSignIn}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="form-group">
                        <button
                          className="form-control btn btn-primary  px-3"
                          onClick={toggleSignUp}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="w-100 text-center">
                    &mdash; Or Sign In With &mdash;
                  </p>
                  <div className="social d-flex text-center">
                    <GoogleLogin
                      className="w-100"
                      clientId="706431454007-36pjg6rqlfu7jqprv240sbasgplvv38l.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </section>

        <script src="/js/jquery.min.js"></script>
        <script src="/js/popper.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/main.js"></script>
      </div>
    </>
  );
};

export default Login;
