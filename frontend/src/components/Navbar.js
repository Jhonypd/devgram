import "./Navbar.scss";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

const Navbar = () => {
  return (
    <div>
      <nav id="nav">
        <Link to={"/"}>DevGram</Link>
        <form>
          <BsSearch />
          <input type="text" placeholder="Pesquisar" />
        </form>
        <ul id="nav-links">
          <li>
            <NavLink to={"/"}>
              <BsHouseDoorFill />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
