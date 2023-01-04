import "./Login.scss";
import React, { useEffect, useState } from "react";
import { fetcherPost } from "../../services/fetcher";
import { loginPending, loginFailed, loginCompleted } from "../../features/Login/loginSlice";
import { getInfosPending } from "../../features/User/userSlice";
import { getErrorMsg } from "../../features/Login/loginSelector";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const [isRemembered, setIsRemembered] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMsg = useSelector(getErrorMsg);

  /**
   * If the username is saved in localStorage, then set the password and username to the saved values and
   * set the isRemembered state to true.
   */
  const handleDefaultChecked = () => {
    const isSaved = localStorage.getItem("username") ? true : false;
    if (isSaved) {
      setPassword(localStorage.getItem("password"));
      setUsername(localStorage.getItem("username"));
      setIsRemembered(true);
    }
  };

  /**
   * if the state isRemembered is true, save the username and password in the localStorage.
   * Fetch the API with the username and password.
   * If the response is ok, dispatch the login action and redirect the user on his profile.
   * If the response is not ok, display an appropriate error message.
   * @param {event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRemembered) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    }
    dispatch(loginPending());
    try {
      const response = await fetcherPost(
        "http://localhost:3001/api/v1/user/login",
        { email: username, password: password }
      );
      const data = await response.json();
      if (data.status === 400) {
        const message = data.message.split(":")[1];
        dispatch(loginFailed(message));
      } else {
        dispatch(loginCompleted(data));
        dispatch(getInfosPending());
        navigate("/profile");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * If the checkbox is checked, set the state to true. If the checkbox is unchecked, set the state to
   * false and clear the local storage.
   * @param {Event} e
   */
  const rememberMe = (e) => {
    if (e.target.checked) setIsRemembered(true);
    else {
      setIsRemembered(false);
      localStorage.clear();
    }
  };

  useEffect(() => {
    handleDefaultChecked();
  }, []);

  return (
    <React.Fragment>
    <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onChange={rememberMe}
                checked={isRemembered ? "checked" : ""}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign in
            </button>
          </form>
          <span className="errorMessage">{errorMsg}</span>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}