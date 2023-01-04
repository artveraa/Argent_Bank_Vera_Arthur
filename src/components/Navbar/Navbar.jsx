import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { getFirstName } from "../../features/User/userSelector";
import { getToken} from "../../features/Login/loginSelector";
import { logout } from "../../features/Login/loginSlice";
import { resetInfos } from "../../features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch    = useDispatch();
  const firstName   = useSelector(getFirstName);
  const isToken     = useSelector(getToken);
  const navigate    = useNavigate();

  /**
   * When triggered, datas are removed from the store and user is redirected to the home page
   * @param {event} e
   */
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetInfos());
    navigate("/");
  };

  /**
   * Template to display when user is logged out
   * @returns JSX Element for the navbar
   */
  const templateSignOut = () => {
    return (
      <div>
        <Link className="main-nav-item" to={`/profile`}>
          <i className="fa fa-user-circle"></i>
          {firstName}
        </Link>
        <Link className="main-nav-item" onClick={handleLogOut}>
          <i className="fa fa-sign-out"></i>
          Sign out
        </Link>
      </div>
    );
  };

  /**
   * Template to display when user is logged in
   * @returns JSX Element for the navbar
   */
  const templateSignIn = () => (
    <div>
      <Link className="main-nav-item" to={`/login`}>
        Sign in
      </Link>
    </div>
  );

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={`/`}>
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {isToken ? templateSignOut() : templateSignIn()}
    </nav>
  );
}
