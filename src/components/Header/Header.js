import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-area">
      <div className="row">
        <div className="col-md-4">
          <div className="logo">
            <h2>waterway services</h2>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="mainmenu">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/launch">Destination</Link>
            </li>
            <li>
              <Link className="login-btn" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
