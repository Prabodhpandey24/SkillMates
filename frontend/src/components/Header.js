import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import HamBar from "../img/ham.png";
import Search from "../img/search.png";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const [isComponentVisible, setComponentVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Set the visibility based on the desired pixel range (e.g., between 600 and 900 pixels)
      setComponentVisible(windowWidth <= 600);
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [openSideDrawer, setOpenSideMenu] = useState(false);

  const hiddenstyle = {
    display: isComponentVisible ? "none" : "flex",
  };

  const toggleDrawer = () => {
    setOpenSideMenu(!openSideDrawer);
  };

  return (
    <div className="container-fluid p-0">
      <div className="bg-primary py-3">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <img src=""></img>
              <span className="text-light">Skill Mates</span>
            </div>
            <div className="col-5">
              <input
                type="text"
                placeholder="Find Courses"
                value={searchTerm}
                onChange={handleInputChange}
              />
              {!isComponentVisible && (
                <img src={Search} className="searchIcon"></img>
              )}
            </div>
            <div className="col-sm-2" style={hiddenstyle}>
              <a
                href="#"
                className="text-light"
                onMouseEnter={handleMouseEnter}
              >
                Log In
              </a>
              {isDropdownVisible && (
                <div
                  className="dropdown-content"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ul className="p-0 px-3 roleList">
                    <li>
                      <a href="#">Student</a>
                    </li>
                    <li>
                      <a href="#">Educator</a>
                    </li>
                    <li>
                      <a href="#">School</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="col-sm-2" style={hiddenstyle}>
              <span className="text-light">Sign Up</span>
            </div>
            {isComponentVisible && (
              <div className="col-4">
                <a onClick={toggleDrawer}>
                  <img className="hamBurger" src={HamBar}></img>
                </a>
              </div>
            )}
            {openSideDrawer && (
              <div className="sideNav">
                <div
                  className="dropdownSidebar"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ul className="p-0 px-3 roleList">
                    <li>
                      <a href="#">Student</a>
                    </li>
                    <li>
                      <a href="#">Educator</a>
                    </li>
                    <li>
                      <a href="#">School</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
