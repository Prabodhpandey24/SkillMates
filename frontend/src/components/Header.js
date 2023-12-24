import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import HamBar from "../img/ham.png";
import Search from "../img/search.png";
import Book from "../img/book.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  //Logout
  const logout = () => {
    localStorage.clear();
    console.warn("apple");
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

  // Search result perform
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    const search = async () => {
      try {
        if (!key.trim()) {
          setSearchResult([]);
          return;
        }
        const params = new URLSearchParams({ key, limit: 5 });
        const res = await fetch(
          `http://localhost:5000/api/v1/courses?${params}`
        );
        const data = await res.json();
        setSearchResult(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [key]);

  return (
    <div className="container-fluid p-0">
      <div className="py-3 navbarShadow">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <img src=""></img>
              <span className="">Skill Mates</span>
            </div>
            <div className="col-5 d-flex justify-content-center position-relative">
              <input
                type="text"
                placeholder="Find Courses"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="searchBar"
              />
              {!isComponentVisible && (
                <div className="searchbarDiv">
                  <img src={Search} className="searchIcon"></img>
                </div>
              )}
            </div>

            {auth && (
              <div className="col-sm-2 justify-content-end" style={hiddenstyle}>
                <a href="/" className="LogBtn" onMouseEnter={handleMouseEnter}>
                  Profile
                </a>
                {isDropdownVisible && (
                  <ul className="p-0 px-3 roleList" onMouseLeave={handleMouseLeave}>
                    <li>
                      <a href="#">Name</a>
                    </li>
                    <li>
                      <a href="#">Your Courses</a>
                    </li>
                    <li>
                      <a href="#">Order</a>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {auth ? (
              <div className="col-sm-2 " style={hiddenstyle}>
                <a href="/" onClick={logout} className="SignBtn">
                  Logout
                </a>
              </div>
            ) : (
              <>
                <div
                  className="col-sm-2 justify-content-end"
                  style={hiddenstyle}
                >
                  <a href="/signin" className="LogBtn">
                    Log In
                  </a>
                </div>

                <div className="col-sm-2" style={hiddenstyle}>
                  <a href="/signup" className="SignBtn">
                    Sign Up
                  </a>
                </div>
              </>
            )}
            {isComponentVisible && (
              <div className="col-2">
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
      {searchResult && searchResult.length > 0 && (
        <div className="col-5">
          <div className="search-result">
            {searchResult.map((course) => (
              <div className="result-item" key={course._id}>
                <div className="img">
                  <img src={course.imageUrl} alt="" />
                </div>
                <div className="course-info">
                  <p className="name">{course.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
