import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlide";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const logOutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__white"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("./")}
          className="nav__logo"
          src="https://i.blogs.es/37e82b/asi-funciona-rss/1366_2000.jpg"
          alt=""
        />
        <PowerSettingsNewIcon className="nav__button" onClick={logOutUser} />
      </div>
    </div>
  );
};

export default Nav;
