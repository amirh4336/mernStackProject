import { NavLink } from "react-router-dom";
import "./NavLink.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
          <li>
            <button onClick={logout}>LOGOUT</button>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
