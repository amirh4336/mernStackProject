import { Link } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";

import NavLinks from "../NavLinks/NavLinks";
import "./MainNavigation.css";
import SideDrawer from "../SideDrawer/SideDrawer";
import { useState } from "react";
import Backdrop from "../../UIElements/Backdrop/Backdrop";

const MainNavigation = () => {
  const [draweIsOpen, setDraweIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDraweIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDraweIsOpen(false);
  };

  return (
    <>
    {draweIsOpen && <Backdrop onClick={closeDrawerHandler} />}
        <SideDrawer show={draweIsOpen} onClick={closeDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
